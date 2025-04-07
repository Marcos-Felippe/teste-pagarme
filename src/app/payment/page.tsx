'use client'

import Header from "@/components/header";
import { usePedidoContext } from "@/contexts/pedido-context";
import axios from "axios";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function Payment() {

  const { pedidoID, loadingPedidoID, setPedidoID } = usePedidoContext();
  const [loadingPedido, setLoadingPedido] = useState<boolean>(false);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if(pedidoID.length == 0 && !loadingPedidoID){
      
    }
  }, [loadingPedidoID]);

  const fetcher = (url: string) => axios.get(url, {
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: 'Basic c2tfdGVzdF9lZjk4MzQ5N2VmY2I0MzE2ODhiNmI5ZmZlZWVmZjNiMzo='
    }
  }).then(res => res.data);

  const { data, mutate, error, isLoading } = useSWR(
      `https://api.pagar.me/core/v5/orders/${pedidoID}`,
      fetcher,
      {
          refreshInterval: 10000,
          revalidateOnFocus: true,
          revalidateOnReconnect: true
      }
  );

  if(!isLoading && !error && data){
    console.log(data.charges[0].last_transaction.status);
    setStatus(data.charges[0].last_transaction.status);
    console.log(status);
  }

  if(error){
    console.log(error);
    return (
      <>
        <Header text="Paróquia" />
        <main className="mx-auto pb-5 px-2 pt-4 bg-white w-full">
          <div className="items-center justify-center mb-4">
            <img className="h-auto max-w-full mx-auto" src="/doar.png" alt="pix" />
          </div>

          <div className="block gap-4 mb-4 mx-auto items-center justify-center px-5">
            <h2 className="text-xl lg:text-3xl font-bold font-mono tracking-tight text-gray-900 text-center">Erro ao buscar pedido<br/>Buscando novamente...</h2>
          </div>
    
        </main>
      </>
      
    );
  }

  if(status == "loading"){
    return (
      <>
        <Header text="Paróquia" />
        <main className="mx-auto pb-5 px-2 pt-4 bg-white w-full">
          <div className="items-center justify-center mb-4">
            <img className="h-auto max-w-full mx-auto" src="/doar.png" alt="pix" />
          </div>

          <div className="block gap-4 mb-4 mx-auto items-center justify-center px-5">
            <h2 className="text-xl lg:text-3xl font-bold font-mono tracking-tight text-gray-900 text-center">Carregando...</h2>
          </div>
    
        </main>
      </>
      
    );
  }

  if(status == "waiting_capture" || status == "authorized_pending_capture" || status == "pending_refund" || status == "waiting_cancellation"){
    return (
      <>
        <Header text="Paróquia" />
        <main className="mx-auto pb-5 px-2 pt-4 bg-white w-full">
          <div className="items-center justify-center mb-4">
            <img className="h-auto max-w-full mx-auto" src="/doar.png" alt="pix" />
          </div>

          <div className="block gap-4 mb-4 mx-auto items-center justify-center px-5">
            <h2 className="text-xl lg:text-3xl font-bold font-mono tracking-tight text-gray-900 text-center">Agurde...</h2>
          </div>
          
          <div className="items-center justify-center mb-4 mt-4 p-4 pb-8">
            <p className="mt-8 font-normal text-gray-600 font-sans text-base md:text-xl text-center">Estamos processando a sua contribuição</p> 
          </div>
          
        </main>
      </>
      
    );
  }

  if(status == "waiting_payment"){
    return (
      <>
        <Header text="Paróquia" />
        <main className="mx-auto pb-5 px-2 pt-4 bg-white w-full">
          <div className="items-center justify-center mb-4">
            <img className="h-auto max-w-full mx-auto" src="/doar.png" alt="pix" />
          </div>
          <h2 className="text-xl lg:text-3xl font-bold font-mono tracking-tight text-gray-900 text-center px-5">Leia o QRCode abaixo para concluir sua Doação:</h2>

          <div className="bg-white flex flex-col justify-between rounded-lg">
            <div className="flex flex-wrap isolate">
              <div className='mx-auto mb-4 mt-4 p-4 pb-8 items-center w-[500px] md:w-full md:max-w-[800px]'>

                <img className="h-auto w-[200px] lg:w-[300px] mx-auto rounded-lg shadow-xl border-2 border-gray-300" src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Link_pra_pagina_principal_da_Wikipedia-PT_em_codigo_QR_b.svg" alt="qrcode" />

                <p className="mt-8 font-normal text-gray-600 font-sans text-xs md:text-base text-center">Aproxime sua câmera para escanear o QRCode</p> 
              </div>
            </div>
          </div>
        </main>
      </>
      
    );
  }

  if(status == "paid" || status == "captured"){
    return (
      <>
        <Header text="Paróquia" />
        <main className="mx-auto pb-5 px-2 pt-4 bg-white w-full">
          <div className="items-center justify-center mb-4">
            <img className="h-auto max-w-full mx-auto" src="/doar.png" alt="pix" />
          </div>

          <div className="block gap-4 mb-4 mx-auto items-center justify-center px-5">
            <h2 className="text-xl lg:text-3xl font-bold font-mono tracking-tight text-gray-900 text-center">Doação realizada com</h2>

            <h2 className="text-xl lg:text-3xl font-extrabold font-mono tracking-tight text-green-600 text-center">Sucesso!</h2>
          </div>
          
          <div className="items-center justify-center mb-4 mt-4 p-4 pb-8">
            <p className="mt-8 font-normal text-gray-600 font-sans text-base md:text-xl text-center">Agradecemos sua contribuição</p> 
          </div>

          <div className="flex mt-5 max-w-2xs mx-auto justify-center">
            <a  href="#" className="md:col-span-1 p-6 bg-slate-800 text-white rounded-md shadow hover:bg-slate-600 text-center">Voltar ao Site da Paróquia</a>
          </div>
          
        </main>
      </>
      
    );
  }

  if(status == "with_error" || status == "failed" ||
    status == "refunded" || status == "voided" ||
    status == "error_on_voiding" || status == "error_on_refunding" ||
    status == "partial_void" || status == "partial_refunded" ||
    status == "not_authorized"
  ){
    return (
      <>
        <Header text="Paróquia" />
        <main className="mx-auto pb-5 px-2 pt-4 bg-white w-full">
          <div className="items-center justify-center mb-4">
            <img className="h-auto max-w-full mx-auto" src="/doar.png" alt="pix" />
          </div>

          <div className="block gap-4 mb-4 mx-auto items-center justify-center px-5">
            <h2 className="text-xl lg:text-3xl font-extrabold font-mono tracking-tight text-red-800 text-center">Falha</h2>
            <h2 className="text-xl lg:text-3xl font-bold font-mono tracking-tight text-gray-900 text-center">ocorrida durante a doação!</h2>

            
          </div>
          
          <div className="items-center justify-center mb-4 mt-4 p-4 pb-8">
            <p className="mt-8 font-normal text-gray-600 font-sans text-base md:text-xl text-center">Infelizmente um erro ocorreu durante o processamento da sua contribuição</p> 
          </div>

          <div className="flex mt-5 max-w-2xs mx-auto justify-center">
            <a  href="#" className="md:col-span-1 p-6 bg-slate-800 text-white rounded-md shadow hover:bg-slate-600 text-center">Voltar ao Site da Paróquia</a>
          </div>
          
        </main>
      </>
      
    );
  }

  return (
    <>
      <Header text="Paróquia" />
      <main className="mx-auto pb-5 px-2 pt-4 bg-white w-full">
        <h2 className="text-3xl font-bold font-mono tracking-tight text-gray-900 text-center">Carregando...</h2>

      </main>
    </>
  );
}
