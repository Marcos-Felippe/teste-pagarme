'use client'

import AddPedido from "@/components/add-pedido";
import Header from "@/components/header";
import DonationDesc from "@/components/donation-desc";

export default function DoacaoSeminario() {
    
    return (
        <>
            <Header text="Paróquia" />
            <main className="mx-auto pb-5 px-2 pt-4 bg-white w-full">
                <h2 className="text-3xl font-bold font-mono tracking-tight text-gray-900 text-center">Doação para o Seminário</h2>

                <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 lg:grid-cols-2">
                    <DonationDesc />

                    <div className="overflow-hidden bg-white flex flex-col justify-between">
                        <div className="flex flex-wrap isolate">
                            <AddPedido />
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}