import axios from "axios";


export async function addPedidoPix(){
    try{

        /*const response = await axios.post(
            `https://api.pagar.me/core/v5/orders`,
            {
                customer: {
                    name: "Cliente Teste",
                    email: "clienteteste@gmail.com",
                    type: 'individual',
                    document: '01234567890',
                    phones: {
                        mobile_phone: {
                            country_code: '55',
                            number: '22180513',
                            area_code: '19'
                        }
                    }
                },
                items: [{amount: 5000, description: 'Doação tipo 1', quantity: 1}],
                payments: [
                    {
                      payment_method: 'pix',
                      pix: {expires_in: 3600},
                    }
                ]
            },
            {
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    authorization: 'Basic ' + Buffer.from("pk_test_JE2zvwqIm1HxjLGV:").toString('base64')
                }
            }
        );

        console.log(response);*/
        
        const options = {
            method: 'POST',
            url: 'https://api.pagar.me/core/v5/orders',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                authorization: 'Basic c2tfdGVzdF9lZjk4MzQ5N2VmY2I0MzE2ODhiNmI5ZmZlZWVmZjNiMzo='
            },
            data: {
                customer: {
                phones: {mobile_phone: {country_code: '55', area_code: '19', number: '123456789'}},
                name: 'Tony Stark',
                type: 'individual',
                email: 'avengerstark@ligadajustica.com.br',
                document: '12345678912',
                document_type: 'CPF'
                },
                items: [{amount: 3000, description: 'Chaveiro do Tesseract', quantity: 1, code: '1'}],
                payments: [{Pix: {expires_in: 3600}, payment_method: 'pix'}]
            }
            };

        axios
            .request(options)
            .then(function (response) {
                console.log(response.data);
                return {
                    error: false,
                    response: response.data
                }
            })
            .catch(function (error) {
                console.error(error);
                return {
                    error: true,
                    response: null
                }
            });
        
        

    } catch(error: any){
        console.log(error.message);
        return {
            error: true,
            response: null
        }
    }
}


export async function getPedidos(){
    try{
            const options = {
                method: 'GET',
                url: 'https://api.pagar.me/core/v5/orders?page=1&size=10',
                headers: {   
                    accept: 'application/json',
                    Authorization: 'Basic ' + Buffer.from("sk_test_bea94b27d6994cdeb581946a68ebc312:").toString('base64')
                }
              };
              
              axios
                .request(options)
                .then(function (response) {
                  console.log(response.data);
                })
                .catch(function (error) {
                  console.error(error);
                });

    } catch(error: any){
        console.log(error.message);
        return {
            error: true,
            message: "Erro inexperado",
            response: {}
        }
    }
}


