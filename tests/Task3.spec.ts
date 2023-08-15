import { Blockchain, SandboxContract } from '@ton-community/sandbox';
import { Builder, Cell, TupleBuilder, toNano } from 'ton-core';
import { Task3 } from '../wrappers/Task3';
import '@ton-community/test-utils';
import { compile } from '@ton-community/blueprint';

describe('Task3', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('Task3');
    });

    let blockchain: Blockchain;
    let task3: SandboxContract<Task3>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        task3 = blockchain.openContract(Task3.createFromConfig({}, code));

        const deployer = await blockchain.treasury('deployer');

        const deployResult = await task3.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: task3.address,
            deploy: true,
            success: true,
        });
    });

// [1 0 1 0 0 0 1 0 1 1 1 1 1 1 1 1 1 0 1 1 1 1 1 1 1 1 0 1 1 1 1 1 1 1 0 1]
// [1 0 1 0 0 0 1 0 1           1 1 1 0 1           1 1 0 1           ? ? ?]  
// [1 0 1 0 0 0 1 0 1           1 1 1 0 1           1 1 0 1           1 0 1]
// [1 0 1 0 0 0 1 0 1 1 1 1 1 1 1 1 1 0 1 1 1 1 1 1 1 1 0 1 1 1 1 1 1 1 0 1]
// [1 0 1 0 1 0 1 0 0 0 1 0 1 0 1 0 1 1 0 1 1 0 1 1 0 1 1 0 1 1 0 1 1 0 1 1 0 1 1 0 1 0 1 0 1 1 0 1 1 0 1 1 0 1 1 0 1 1 0 1 1 0 1 1 0 1 0 1 0 1 1 0 1 1 0 1 1 0 1 1 0 1 1 0 1 1 0 1 0 1 0 1]
// [1 0 1 0 1 0 1 0 0 0 1 0 1 0 1 0 1 1 0 1 1 0 1 1 0 1 1 0 1 1 0 1 1 0 1 1 0 1 1 0 1 0 1 0 1 1 0 1 1 0 1 1 0 1 1 0 1 1 0 1 1 0 1 1 0 1 0 1 0 1 1 0 1 1 0 1 1 0 1 1 0 1 1 0 1 1 0 1 0 1 0 1]
// [1 1 0 1 1 0 0 0 1 1 0 1 1 1 1 1 1 1 1 1 1 0 1 1 1 1 1 1 1 1 1 0 1 1 1 1 1 1 1 1 0 1]
// [1 0 1 0 0 0 1 0 1 1 1 1 1 1 1 1 1 0 1 1 1 1 1 1 1 1 0 1 1 1 1 1 1 1 0 1]
// [1 1 0 1 1 0 0 0 1 1 0 1 1 1 1 1 1 1 1 1 1 0 1 1 1 1 1 1 1 1 1 0 1 1 1 1 1 1 1 1 0 1]
// [1 1 0 1 1 0 0 0 1 1 0 1 1 1 1 1 1 1 1 1 1 0 1 1 1 1 1 1 1 1 1 0 1 1 1 1 1 1 1 1 0 1]


// [1 0 1 0 0 0 1 0 1 1 1 1 1 1 1 1 1 0 1 1 1 1 1 1 1 1 0 1 1 1 1 1 1 1 0 1]
// [1 0 1 0 0 0 1 0 1 0 1 0 1 0 0 1 0 1 0 1 1 0 1 0 1 0 1 0 1]
// [1 0 1 0 0 0 1 0 1 0 1 0 1 0 0 1 0 1 0 1 1 0 1 0 1 0 1 0 1]
// [1 0 1 0 0 0 1 0 1 0 1 0 1 0 0 1 0 1 0 1 1 0 1 0 1 0 1 0 1]

// [1 0 1 0 0 0 1 0 1 1 1 1 1 1 1 1 1 0 1 1 1 1 1 1 1 1 0 1 1 1 1 1 1 1 0 1]
// [1 0 1 0 0 0 1 0 1 0 0 1 0 0 1 0 0 1 0 0 1 0 1 0 0 1 0 0 1 0 0 1 0 0 0 1 0 0 1 0 0 1 0 0 1 0 1]
// [1 0 1 0 0 0 1 0 1 0 0 1 0 0 1 0 0 1 0 0 1 0 1 0 0 1 0 0 1 0 0 1 0 0 0 1 0 0 1 0 0 1 0 0 1 0 1]


    // it('flag lt value', async () => {
    //     // the check is done inside beforeEach
    //     // blockchain and task3 are ready to use
    //     const tb = new TupleBuilder()
    //     tb.writeNumber(2)
    //     tb.writeNumber(4)
    //     tb.writeCell(
    //         (new Builder()).storeUint(0b1010001011, 10)
    //         .storeRef(
    //             (new Builder()).storeUint(0b111111101, 9)
    //             .storeRef(
    //                 (new Builder()).storeUint(0b11111110, 8)
    //                 .storeRef(
    //                     (new Builder()).storeUint(0b111111101, 9)
    //                 )
    //             )
    //         )
    //         .asCell()
    //     )

    //     // let exp = tb.writeCell

    //     const r = await blockchain.runGetMethod(task3.address, "find_and_replace", tb.build())

    //     let rc = r.stackReader.readCell()
    //     console.log("gasUsed: ", r.gasUsed.toString())
    //     console.log("readCell: ", rc.toString())
    // });

    // it('flag lt value', async () => {
    //     // the check is done inside beforeEach
    //     // blockchain and task3 are ready to use
    //     const tb = new TupleBuilder()
    //     tb.writeNumber(3)
    //     tb.writeNumber(4)
    //     tb.writeCell(
    //         (new Builder()).storeUint(0b1010001011, 10)
    //         .storeRef(
    //             (new Builder()).storeUint(0b111111101, 9)
    //             .storeRef(
    //                 (new Builder()).storeUint(0b11111110, 8)
    //                 .storeRef(
    //                     (new Builder()).storeUint(0b111111101, 9)
    //                 )
    //             )
    //         )
    //         .asCell()
    //     )

    //     // let exp = tb.writeCell

    //     const r = await blockchain.runGetMethod(task3.address, "find_and_replace", tb.build())

    //     let rc = r.stackReader.readCell()
    //     console.log("gasUsed: ", r.gasUsed.toString())
    //     console.log("readCell: ", rc.toString())
    // });

    // it('flag lt value', async () => {
    //     // the check is done inside beforeEach
    //     // blockchain and task3 are ready to use
    //     const tb = new TupleBuilder()
    //     tb.writeNumber(4)
    //     tb.writeNumber(4)
    //     tb.writeCell(
    //         (new Builder()).storeUint(0b1010001011, 10)
    //         .storeRef(
    //             (new Builder()).storeUint(0b111111101, 9)
    //             .storeRef(
    //                 (new Builder()).storeUint(0b11111110, 8)
    //                 .storeRef(
    //                     (new Builder()).storeUint(0b111111101, 9)
    //                 )
    //             )
    //         )
    //         .asCell()
    //     )

    //     // let exp = tb.writeCell

    //     const r = await blockchain.runGetMethod(task3.address, "find_and_replace", tb.build())

    //     let rc = r.stackReader.readCell()
    //     console.log("gasUsed: ", r.gasUsed.toString())
    //     console.log("readCell: ", rc.toString())
    // });

    // [1 0 1 0 0 0 1 0 1 1 1 1 1 1 1 1 1 0 1 1 1 1 1 1 1 1 0 1 1 1 1 1 1 1 0 1]
    // [1 0 0 0 0 0 1 0 0 1 1 1 1 1 1 1 1 0 0 1 1 1 1 1 1 1 0 0 1 1 1 1 1 1 0 0]
    // [1 0 0 0 0 0 1 0 0 1 1 1 1 1 1 1 1 0 0 1 1 1 1 1 1 1 0 0 1 1 1 1 1 1 0 0]
    // [1 0 1 0 0 0 1 0 1 1 1 1 1 1 1 1 1 0 1 1 1 1 1 1 1 1 0 1 1 1 1 1 1 1 0 1]
    // [1 0 1 0 0 0 1 0 1 0 0 1 0 0 1 0 1 0 0 1 0 0 0 1 0 0 1 1 1 0 1]
    // [1 0 1 0 0 0 1 0 1 0 0 1 0 0 1 0 1 0 0 1 0 0 0 1 0 0 1 1 1 0 1]

    // [101000101010011111110101011101001101010110101110001101010010101011111110101011101001101010101010111111101]
    // [1010001010100100010000101111110011001010111000110101001010101000100001011111100110001010111111101]
    // [10100010101001000100001011111100110010101110001101010010101010001000010111111001100111111101]

    // [1010001010100100010000101111110011001010111000110101001010101000100001011111100110001010111111101]
    // [1010001010100100010000101111110011001010111000110101001010101000100001011111100110001010111111101]
    // 1010001010100100010000101111110011001010111000110101001010101000100001011111100110001010111111101]

    it('flag lt value', async () => {
        // the check is done inside beforeEach
        // blockchain and task3 are ready to use
        const tb = new TupleBuilder()
        tb.writeNumber(133526741) // 111111101010111010011010101
        tb.writeNumber(4468684) // 10001000010111111001100
        tb.writeCell(
            (new Builder()).storeUint(0b10100010101001111111010101110100, 32)
            .storeRef(
                (new Builder()).storeUint(0b11010101101011100011010100101010, 32)
                .storeRef(
                    (new Builder()).storeUint(0b11111110101011101001101010101010, 32)
                    .storeRef(
                        (new Builder()).storeUint(0b111111101, 9)
                    )
                )
            )
            .asCell()
        )

        // let exp = tb.writeCell

        const r = await blockchain.runGetMethod(task3.address, "find_and_replace", tb.build())

        let rc = r.stackReader.readCell()
        console.log("gasUsed: ", r.gasUsed.toString())
        console.log("readCell: ", rc.toString())
    });
    
    // 101000101010010001000010111111001100010110101110001101010010101011000100001011111100110001010110111111101
    // 10100010101001111111010101110100110101010101101011100011010100101010111111110101011101001101010101010110111111101
    // 10100010101001111111010101110100110101010101101011100011010100101010111111110101011101001101010101010110111111101
    // 10100010101001111111010101110100110101010101101011100011010100101010111111110101011101001101010101010110111111101

    it('flag lt value', async () => {
        // the check is done inside beforeEach
        // blockchain and task3 are ready to use
        const tb = new TupleBuilder()
        tb.writeNumber(4468684) // 10001000010111111001100
        tb.writeNumber(133526741) // 111111101010111010011010101
        tb.writeCell(
            (new Builder()).storeUint(0b10100010101001000100001011111100, 32)
            .storeRef(
                (new Builder()).storeUint(0b11000101101011100011010100101010, 32)
                .storeRef(
                    (new Builder()).storeUint(0b11000100001011111100110001010110, 32)
                    .storeRef(
                        (new Builder()).storeUint(0b111111101, 9)
                    )
                )
            )
            .asCell()
        )

        // let exp = tb.writeCell

        const r = await blockchain.runGetMethod(task3.address, "find_and_replace", tb.build())

        let rc = r.stackReader.readCell()
        console.log("gasUsed: ", r.gasUsed.toString())
        console.log("readCell: ", rc.toString())
    });


    // it('flag lt value', async () => {
    //     // the check is done inside beforeEach
    //     // blockchain and task3 are ready to use
    //     const tb = new TupleBuilder()
    //     tb.writeNumber(6)
    //     tb.writeNumber(4)
    //     tb.writeCell(
    //         (new Builder()).storeUint(0b1010001011, 10)
    //         .storeRef(
    //             (new Builder()).storeUint(0b111111101, 9)
    //             .storeRef(
    //                 (new Builder()).storeUint(0b11111110, 8)
    //                 .storeRef(
    //                     (new Builder()).storeUint(0b111111101, 9)
    //                 )
    //             )
    //         )
    //         .asCell()
    //     )

    //     // let exp = tb.writeCell

    //     const r = await blockchain.runGetMethod(task3.address, "find_and_replace", tb.build())

    //     let rc = r.stackReader.readCell()
    //     console.log("gasUsed: ", r.gasUsed.toString())
    //     console.log("readCell: ", rc.toString())
    // });

    // it('flag lt value', async () => {
    //     // the check is done inside beforeEach
    //     // blockchain and task3 are ready to use
    //     const tb = new TupleBuilder()
    //     tb.writeNumber(7)
    //     tb.writeNumber(4)
    //     tb.writeCell(
    //         (new Builder()).storeUint(0b1010001011, 10)
    //         .storeRef(
    //             (new Builder()).storeUint(0b111111101, 9)
    //             .storeRef(
    //                 (new Builder()).storeUint(0b11111110, 8)
    //                 .storeRef(
    //                     (new Builder()).storeUint(0b111111101, 9)
    //                 )
    //             )
    //         )
    //         .asCell()
    //     )

    //     // let exp = tb.writeCell

    //     const r = await blockchain.runGetMethod(task3.address, "find_and_replace", tb.build())

    //     let rc = r.stackReader.readCell()
    //     console.log("gasUsed: ", r.gasUsed.toString())
    //     console.log("readCell: ", rc.toString())
    // });


    // it('flag lt value', async () => {
    //     // the check is done inside beforeEach
    //     // blockchain and task3 are ready to use
    //     const tb = new TupleBuilder()
    //     tb.writeNumber(8)
    //     tb.writeNumber(4)
    //     tb.writeCell(
    //         (new Builder()).storeUint(0b1010001011, 10)
    //         .storeRef(
    //             (new Builder()).storeUint(0b111111101, 9)
    //             .storeRef(
    //                 (new Builder()).storeUint(0b11111110, 8)
    //                 .storeRef(
    //                     (new Builder()).storeUint(0b111111101, 9)
    //                 )
    //             )
    //         )
    //         .asCell()
    //     )

    //     // let exp = tb.writeCell

    //     const r = await blockchain.runGetMethod(task3.address, "find_and_replace", tb.build())

    //     let rc = r.stackReader.readCell()
    //     console.log("gasUsed: ", r.gasUsed.toString())
    //     console.log("readCell: ", rc.toString())
    // });


    // it('flag lt value', async () => {
    //     // the check is done inside beforeEach
    //     // blockchain and task3 are ready to use
    //     const tb = new TupleBuilder()
    //     tb.writeNumber(9)
    //     tb.writeNumber(4)
    //     tb.writeCell(
    //         (new Builder()).storeUint(0b1010001011, 10)
    //         .storeRef(
    //             (new Builder()).storeUint(0b111111101, 9)
    //             .storeRef(
    //                 (new Builder()).storeUint(0b11111110, 8)
    //                 .storeRef(
    //                     (new Builder()).storeUint(0b111111101, 9)
    //                 )
    //             )
    //         )
    //         .asCell()
    //     )

    //     // let exp = tb.writeCell

    //     const r = await blockchain.runGetMethod(task3.address, "find_and_replace", tb.build())

    //     let rc = r.stackReader.readCell()
    //     console.log("gasUsed: ", r.gasUsed.toString())
    //     console.log("readCell: ", rc.toString())
    // });


    // it('flag lt value', async () => {
    //     // the check is done inside beforeEach
    //     // blockchain and task3 are ready to use
    //     const tb = new TupleBuilder()
    //     tb.writeNumber(10)
    //     tb.writeNumber(4)
    //     tb.writeCell(
    //         (new Builder()).storeUint(0b1010001011, 10)
    //         .storeRef(
    //             (new Builder()).storeUint(0b111111101, 9)
    //             .storeRef(
    //                 (new Builder()).storeUint(0b11111110, 8)
    //                 .storeRef(
    //                     (new Builder()).storeUint(0b111111101, 9)
    //                 )
    //             )
    //         )
    //         .asCell()
    //     )

    //     // let exp = tb.writeCell

    //     const r = await blockchain.runGetMethod(task3.address, "find_and_replace", tb.build())

    //     let rc = r.stackReader.readCell()
    //     console.log("gasUsed: ", r.gasUsed.toString())
    //     console.log("readCell: ", rc.toString())
    // });
    // it('flag gt value', async () => {
    //     // the check is done inside beforeEach
    //     // blockchain and task3 are ready to use
    //     const tb = new TupleBuilder()
    //     tb.writeNumber(6)
    //     tb.writeNumber(2)
    //     tb.writeCell(
    //         (new Builder()).storeUint(0b1010001011, 10)
    //         .storeRef(
    //             (new Builder()).storeUint(0b111111101, 9)
    //             .storeRef(
    //                 (new Builder()).storeUint(0b11111110, 8)
    //                 .storeRef(
    //                     (new Builder()).storeUint(0b111111101, 9)
    //                 )
    //             )
    //         )
    //         .asCell()
    //     )

    //     const r = await blockchain.runGetMethod(task3.address, "find_and_replace", tb.build())

    //     let rc = r.stackReader.readCell()
    //     console.log("gasUsed: ", r.gasUsed.toString())
    //     console.log("readCell: ", rc.toString())
    // });

    // it('flag eq value', async () => {
    //     // the check is done inside beforeEach
    //     // blockchain and task3 are ready to use
    //     const tb = new TupleBuilder()
    //     tb.writeNumber(513876598743265)
    //     tb.writeNumber(6198765298437524309875)
    //     tb.writeCell(
    //         (new Builder()).storeUint(0b1010001010n, 1023)
    //         .storeRef(
    //             (new Builder()).storeUint(0b111111101n, 1023)
    //             .storeRef(
    //                 (new Builder()).storeUint(0b11111110n, 1023)
    //                 .storeRef(
    //                     (new Builder()).storeUint(0b111111101n, 1023)
    //                     .storeRef(
    //                         (new Builder()).storeUint(0b111111101n, 1023)
    //                         .storeRef(
    //                             (new Builder()).storeUint(0b111111101n, 1023)
    //                             .storeRef(
    //                                 (new Builder()).storeUint(0b111111101n, 1023)
    //                             )
    //                         )
    //                     )
    //                 )
    //             )
    //         )
    //         .asCell()
    //     )

    //     const r = await blockchain.runGetMethod(task3.address, "find_and_replace", tb.build())

    //     let rc = r.stackReader.readCell()
    //     console.log("gasUsed: ", r.gasUsed.toString())
    //     console.log("readCell: ", rc.toString())
    // });

});
