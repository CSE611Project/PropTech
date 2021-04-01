function generate_invoice(property_id){

//get all meter bills under this property
    function get_all_meter_and_submeter_bill(property_id, from_date, end_date); 
    
    //return a list structure like:
    /* 
    all_bill {
        "meter_bill":[
        ]
        "submete_bill":[
        ]
    }
    */

    function get_all_meter_and_submeter(property_id); //return a list of all meter and submeter info.

    function get_all_tenant_info(property_id); //return a list of tenants under this property

    function get_MetertoTenant_list(property_id); 



    //step1      preprocess meter bill     (meterbill - submeterbill)

    
    /*
    for tenant in submeter_bill:
        invoice += for submeter in tenant:
                        unit charge * multipler* usage 

    for tenant in meter_bill:
        invoice += for meter in tenant:
                    RUBS* meter charge
    */
    




//get all submeter bills under this property


//get all tenant info under this property









var tenant_bill_list;




return tenant_bill_list;


}