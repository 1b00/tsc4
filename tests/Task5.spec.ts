import { Blockchain, SandboxContract } from '@ton-community/sandbox';
import { Builder, Cell, TupleBuilder, toNano } from 'ton-core';
import { Task5 } from '../wrappers/Task5';
import '@ton-community/test-utils';
import { compile } from '@ton-community/blueprint';

describe('Task5', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('Task5');
    });

    let blockchain: Blockchain;
    let task5: SandboxContract<Task5>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        task5 = blockchain.openContract(Task5.createFromConfig({}, code));

        const deployer = await blockchain.treasury('deployer');

        const deployResult = await task5.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: task5.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and task5 are ready to use
    });

    it('fibonacci_sequence', async () => {
        // the check is done inside beforeEach
        // blockchain and task3 are ready to use
        const tb = new TupleBuilder();
        tb.writeNumber(201);
        tb.writeNumber(4);

        // let exp = tb.writeCell

        const r = await blockchain.runGetMethod(task5.address, "fibonacci_sequence", tb.build())

        let rc = r.stackReader.readTuple()
        console.log("gasUsed: ", r.gasUsed.toString())
        console.log("readTuple: ", rc.toString())
        // let op = rc.beginParse().loadUint(32);
        // console.log("loadBits: ", op.toString())

        // expect(op).toBe(108)
    });
});
