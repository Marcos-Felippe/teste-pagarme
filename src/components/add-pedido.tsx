'use client'

import { usePedidoContext } from '@/contexts/pedido-context';
import { addPedidoPix } from '@/service/api_pagarme';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react';
import { IMaskInput } from 'react-imask';

type AddAddPedidoProps = {
    token: string;
    userName: string;
    userEmail: string;
}

const AddPedido = () => {

    const { pedidoID, loadingPedidoID, setPedidoID } = usePedidoContext();
    const router = useRouter();

    const [valor, setValor] = useState("");
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [cpf, setCPF] = useState("");
    const [ddd, setDDD] = useState("");
    const [telefone, setTelefone] = useState("");
    const [endereco, setEndereco] = useState("");
    const [estado, setEstado] = useState("");
    const [cidade, setCidade] = useState("");
    const [cep, setCep] = useState("");
    const [numeroCartao, setNumeroCartao] = useState("");
    const [titularCartao, setTitularCartao] = useState("");
    const [validadeCartao, setValidadeCartao] = useState("");
    const [cvvCartao, setCvvCartao] = useState("");


    const [paymentMethod, setPaymentMethod] = useState("pix");

    const handleAdd = async (e: FormEvent) => {
        e.preventDefault();

        const addResponse: any = await addPedidoPix();

        if(addResponse!.error === false){
            setPedidoID(addResponse?.response!.id);
            router.push("/payment");
        } else {
            alert(`Erro ao criar pedido`);
        }

        //setValor("");
        //setEmail("");
    }

    return (
        <div className='mx-auto my-4 p-2 items-center w-[400px] sm:w-[500px]'>
            <div className='items-center p-2 bg-white shadow-2xs border-[1px] border-gray-100 rounded-lg w-full'>
                <form className="mx-auto" onSubmit={handleAdd}>
                    {/* Cabeçalho */}
                    <div className='w-full mb-10'>
                        <div className="items-center justify-center text-center">
                            <img className="h-auto max-w-full mx-auto" src="/doar.png" alt="pix" />
                            <h3 className='text-2xl text-center text-gray-800 font-extrabold font-sans mb-4'>Doar:</h3>
                        </div>
                    </div>

                    <div className='w-full'>
                        <div className="flex items-center justify-center">
                            <label htmlFor="new-value" className='shrink-0 font-extrabold font-mono text-[18px] text-gray-800 mr-2'>Valor</label>
                            <IMaskInput
                                mask="R$ num"
                                blocks={{
                                    num: {
                                        mask: Number,
                                        thousandsSeparator: '.',
                                        radix: ',',
                                        mapToRadix: ['.'],
                                    },
                                }}
                                required
                                className="block w-[200px] rounded-md shadow-xl bg-white px-3 py-[10px] text-[15px] font-semibold text-gray-700 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                                value={valor}
                                onAccept={(value) => setValor(value)}
                            />
                            
                        </div>
                    </div>
                    
                    <div className="w-full p-4 text-center">
                        <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
                            <div onClick={ () => setPaymentMethod('pix') } className={`w-auto ${ paymentMethod == 'pix' ? 'border-4 border-blue-400 text-blue-400' : 'border-[1px] border-gray-300 text-gray-700' } bg-gray-100 shadow-xl hover:bg-gray-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-lg inline-flex items-center justify-center px-4 py-2.5`}>
                                <div className='pr-2'>
                                    <img className="h-auto max-w-full" src="/pix.png" alt="pix" />
                                </div>
                                
                                <div className="text-center">
                                    <div className="-mt-1 font-mono text-sm font-semibold">PIX</div>
                                </div>
                            </div>
                            <div onClick={ () => setPaymentMethod('cartão de crédito') } className={`w-auto ${ paymentMethod == 'cartão de crédito' ? 'border-4 border-blue-400 text-blue-400' : 'border-[1px] border-gray-300 text-gray-700' } bg-gray-100 shadow-xl hover:bg-gray-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-lg inline-flex items-center justify-center px-4 py-2.5`}>
                                <div className='pr-2'>
                                    <img className="h-auto max-w-full" src="/credito.png" alt="pix" />
                                </div>
                                <div className="text-left rtl:text-right">
                                    <div className="mt-1 font-mono text-sm font-bold text-center">Cartão de Crédito</div>
                                </div>
                            </div>  
                        </div>
                    </div>
                    
                    {/* Informações */}
                    <div className="mt-5 mb-4">
                        <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="given-name"
                        placeholder='Nome*'
                        required
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        className="block w-full rounded-md shadow-md bg-white px-3 py-[10px] text-base text-gray-700 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                        />
                    </div>
                    
                    <div className="mt-2 mb-4">
                        <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder='E-mail*'
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full rounded-md shadow-md bg-white px-3 py-[10px] text-base text-gray-700 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                        />
                    </div>
                   
                    <div className="mt-2 mb-2">
                        <input
                        id="cpf"
                        name="cpf"
                        type="cpf"
                        placeholder='CPF*'
                        required
                        maxLength={11}
                        value={cpf}
                        onChange={(e) => setCPF(e.target.value)}
                        className="block w-full rounded-md shadow-md bg-white px-3 py-[10px] text-base text-gray-700 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                        />
                    </div>
                  
                    <div className="flex gap-4 mb-4">
                        <div className='flex 1'> 
                            <div className="mt-2 w-14">
                                <input
                                id="ddd"
                                name="ddd"
                                type="phone"
                                autoComplete="ddd"
                                placeholder='DDD*'
                                required
                                maxLength={3}
                                value={ddd}
                                onChange={(e) => setDDD(e.target.value)}
                                className="block w-full rounded-md shadow-md bg-white px-3 py-[10px] text-base text-gray-700 font-semibold outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 placeholder:text-[12px] focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                                />
                            </div>
                        </div>
                        <div className='flex-3'>
                            <div className="mt-2 w-44">
                                <input
                                id="numero"
                                name="numero"
                                type="phone"
                                autoComplete="phone"
                                placeholder='Telefone*'
                                required
                                maxLength={9}
                                value={telefone}
                                onChange={(e) => setTelefone(e.target.value)}
                                className="block w-full rounded-md shadow-md bg-white px-3 py-[10px] text-base text-gray-700 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Cartão de Crédito */}
                    { paymentMethod == 'cartão de crédito' ? (<>
                        <div className="mt-5 mb-4">
                            <p className='text-[16px] text-center text-gray-500 font-normal font-sans mb-4'>Dados Residênciais:</p>
                        </div>

                        <div className="mt-2 mb-4">
                            <input
                            id="street-address"
                            name="street-address"
                            type="text"
                            autoComplete="street-address"
                            placeholder='Endereço*'
                            required
                            value={endereco}
                            onChange={(e) => setEndereco(e.target.value)}
                            className="block w-full rounded-md shadow-md bg-white px-3 py-[10px] text-base text-gray-700 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                            />
                        </div> 
                    
                        <div className="sm:col-span-2 sm:col-start-1">
                            <div className="mt-2">
                                <input
                                id="city"
                                name="city"
                                type="text"
                                autoComplete="address-level2"
                                maxLength={2}
                                placeholder='Estado*'
                                required
                                value={estado}
                                onChange={(e) => setEstado(e.target.value)}
                                className="block w-full rounded-md shadow-md bg-white px-3 py-[10px] text-base text-gray-700 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                                />
                            </div>
                        </div>
                    
                        <div className="sm:col-span-2">
                            <div className="mt-2 mb-4">
                                <input
                                id="region"
                                name="region"
                                type="text"
                                autoComplete="address-level1"
                                placeholder='Cidade*'
                                required
                                value={cidade}
                                onChange={(e) => setCidade(e.target.value)}
                                className="block w-full rounded-md shadow-md bg-white px-3 py-[10px] text-base text-gray-700 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                                />
                            </div>
                        </div>
                    
                        <div className="sm:col-span-2">
                            <div className="mt-2 mb-4">
                                <input
                                id="postal-code"
                                name="postal-code"
                                type="text"
                                autoComplete="postal-code"
                                placeholder='CEP*'
                                required
                                value={cep}
                                onChange={(e) => setCep(e.target.value)}
                                className="block w-full rounded-md shadow-md bg-white px-3 py-[10px] text-base text-gray-700 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                                />
                            </div>
                        
                        </div>

                        <div className="mt-5 mb-4">
                            <p className='text-[16px] text-center text-gray-500 font-normal font-sans mb-4'>Dados do Cartão:</p>
                        </div>

                        <div className="sm:col-span-2">
                            <div className="mt-2 mb-4">
                                <input
                                id="card-num"
                                name="card-num"
                                type="number"
                                placeholder='Número do Cartão*'
                                required
                                value={numeroCartao}
                                onChange={(e) => setNumeroCartao(e.target.value)}
                                className="block w-full rounded-md shadow-md bg-white px-3 py-[10px] text-base text-gray-700 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                                />
                            </div>
                        
                        </div>

                        <div className="sm:col-span-2">
                            <div className="mt-2 mb-4">
                                <input
                                id="card-owner"
                                name="card-owner"
                                type="text"
                                placeholder='Nome do Titular*'
                                required
                                value={titularCartao}
                                onChange={(e) => setTitularCartao(e.target.value)}
                                className="block w-full rounded-md shadow-md bg-white px-3 py-[10px] text-base text-gray-700 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                                />
                            </div>
                        
                        </div>

                        <div className="flex gap-4 mb-4">
                            <div className="mt-2 mb-4 w-[100px]">
                                <input
                                id="card-exp"
                                name="card-exp"
                                type="text"
                                placeholder='00/00*'
                                required
                                value={validadeCartao}
                                onChange={(e) => setValidadeCartao(e.target.value)}
                                className="block w-full rounded-md shadow-md bg-white px-3 py-[10px] text-base text-gray-700 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                                />
                            </div>

                            <div className="mt-2 mb-4 w-[100px]">
                                <input
                                id="card-cvv"
                                name="card-cvv"
                                type="number"
                                maxLength={4}
                                placeholder='CVV*'
                                required
                                value={cvvCartao}
                                onChange={(e) => setCvvCartao(e.target.value)}
                                className="block w-full rounded-md shadow-md bg-white px-3 py-[10px] text-base text-gray-700 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                                />
                            </div>
                        </div>
                        
                    </>)
                        : <></>
                    }

                    <button
                        type='submit'
                        className="w-full md:col-span-1 py-2 bg-slate-800 text-white rounded-md shadow hover:bg-slate-600"
                        
                    >
                        Confirmar Doação
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddPedido