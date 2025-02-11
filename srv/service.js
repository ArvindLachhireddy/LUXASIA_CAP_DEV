const cds = require("@sap/cds");
// const { KNA1 } = cdVAR_KUNNRs.entities;

module.exports = cds.service.impl(srv => {
    srv.on('insert', async (req) => {
        const { kunnr, addrnumber, name1, name2, tel_number, smtp_addr, 
                marketcon,dob,city,pcode,street } = req.data;
        // Add left padding to kunnr and addrnumber
        var kunnr_pad = kunnr.padStart(10, '0'); // Adjust the length and added zero's for matching the data
        var addrnumber_pad = addrnumber.padStart(10, '0'); // Adjust the length and added zero's for matching the data
        
        console.log("kunnr " + kunnr)

        try {
            // Insert data into the KNA1 table
            // const res1 = await cds.run(
            //     INSERT.into('KNA1').entries({
            //         KUNNR: kunnr_pad,
            //         ADRNR: addrnumber_pad,
            //         KATR8: marketcon
            //     }));
            // console.log("res1 " + res1)

            //Insert data into the ZSDRCE_CS_DBV table
            const res1 = await cds.run(
                INSERT.into('ZSDRCE_CS_DBV').entries({
                    MANDT:'',
                    KUNNR: kunnr_pad,
                    ADRNR: addrnumber_pad,
                    PARNR:'',
                    KATR8: marketcon,
                    NAMEV:name1,
                    NAME1: name2,
                    GBDAT: dob
                }));
            console.log("res1 " + res1)

            const res2 = await cds.run(
                INSERT.into('ZSDR_ADRC').entries({
                    CLIENT: '',
                    ADDRNUMBER: addrnumber_pad,
                    DATE_FROM: '',
                    NATION: '',
                    NAME1: name1,
                    NAME2: name2,
                    TEL_NUMBER: tel_number,
                    CITY1:city,
                    POST_CODE1:pcode,
                    STREET:street
                }));
            console.log("res2 " + res2)
            const res3 = await cds.run(
                INSERT.into('ADR6').entries({
                    CLIENT: '',
                    ADDRNUMBER: addrnumber_pad,
                    PERSNUMBER: '',
                    DATE_FROM: '',
                    CONSNUMBER: '',
                    SMTP_ADDR: smtp_addr
                })
            );
            console.log("res3 " + res3)

            // Return a success message or the inserted data
            // console.log("result " + result)
        } catch (error) {
            console.error('Error inserting :', error);
        }
    });
});
