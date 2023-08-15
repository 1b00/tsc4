import { Blockchain, SandboxContract } from '@ton-community/sandbox';
import { Builder, Cell, TupleBuilder, toNano } from 'ton-core';
import { Task4 } from '../wrappers/Task4';
import '@ton-community/test-utils';
import { compile } from '@ton-community/blueprint';

describe('Task4', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('Task4');
    });

    let blockchain: Blockchain;
    let task4: SandboxContract<Task4>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        task4 = blockchain.openContract(Task4.createFromConfig({}, code));

        const deployer = await blockchain.treasury('deployer');

        const deployResult = await task4.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: task4.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and task4 are ready to use
    });

    it('shift check', async () => {
        // the check is done inside beforeEach
        // blockchain and task3 are ready to use
        const tb = new TupleBuilder();
        tb.writeNumber(-126);
        // tb.writeCell(
        //     (new Builder()).storeUint(108, 32)
        //     // .storeUint(0x48656C6C6F2C20576F726C64212121, 120)
        //     .storeStringTail('Hello, World!!!')
        //     .asCell()
        // );
        tb.writeCell(
            (new Builder()).storeUint(0x0, 32).storeStringTail('Hello, World!!!')
            .storeRef(
                (new Builder()).storeStringTail('Hello, World!!!')
                .storeRef(
                    (new Builder()).storeStringTail('Hello, World!!!')
                    .storeRef(
                        (new Builder()).storeUint(0b11111110, 8)
                    )
                )
            )
            .asCell()
        )

        // let exp = tb.writeCell

        const r = await blockchain.runGetMethod(task4.address, "caesar_cipher_encrypt", tb.build())

        let rc = r.stackReader.readCell()
        console.log("gasUsed: ", r.gasUsed.toString())
        console.log("readCell: ", rc.toString())
        // let op = rc.beginParse().loadUint(32);
        // console.log("loadBits: ", op.toString())

        // expect(op).toBe(108)
    });
});
