"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type PedidoContextType = {
    pedidoID: string;
    loadingPedidoID: boolean;
    setPedidoID: (data: string) => {error: string | null; success: boolean};
    clearPedidoID: () => void;
}

// Criando um context
export const PedidoContext = createContext({} as PedidoContextType);


// Criandoas regras de negocio, conteudo provido e o provider do context
export const PedidoProvider = ({ children }: any) => {

    const [pedidoIDState, setPedidoIDState] = useState<string>('order_id');
    const [loadingPedidoID, setLoadinPedidoID] = useState(true);

    useEffect(() => {
        const recoveredPedidoID = localStorage.getItem("pedidoID");

        if(recoveredPedidoID) {
            const pedidoIDParsed = JSON.parse(recoveredPedidoID);
            
            setPedidoIDState(pedidoIDParsed);
        }

        setLoadinPedidoID(false);
    }, []);

    const setPedidoID = (data: string) => {

        try {
            setPedidoIDState(data);
            localStorage.setItem("pedidoID", JSON.stringify(data));

            return {
                success: true,
                error: null
            }

        } catch (error: any) {
            return {
                success: false,
                error: error.message
            }
        }
    }

    const clearPedidoID = () => {
        setPedidoID('order_id');
        localStorage.removeItem("pedidoID");
    }

    // Retornando o context provider com os valores-conteudos a serem passados-utilizados adiante
    return (
        <PedidoContext.Provider value={{
            pedidoID: pedidoIDState, loadingPedidoID, setPedidoID, clearPedidoID
        }}>
            {children}
        </PedidoContext.Provider>
    );
}


export const usePedidoContext = () => {
    // Custom hook to use auth context
    try {
        const context = useContext(PedidoContext);
        if (!context) {
            console.log('usePedidoContext must be used within a PedidoProvider');
            throw new Error('usePedidoContext must be used within a PedidoProvider')
        }

        return context;
    } catch (error: any) {

        console.log(error.message);
        return {
            pedidoID: '',
            loadingPedidoID: false,
            setPedidoID: ()=>{
                return {
                    success: false,
                    error: `${error.message}`
                }
            },
            clearPedidoID: ()=>{}
        }
    }
}