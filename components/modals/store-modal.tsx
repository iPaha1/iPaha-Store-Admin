"use client"; 

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


import { Modal } from "@/components/ui/modal"
import { useStoreModal } from "@/hooks/use-store-modal"
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";


// This is the schema that will be used to validate the form
const formSchema = z.object({
    name: z.string().min(1),
});

// This is the modal component that will be used to create a new store
export const StoreModal = () => {

     // This is the hook that will be used to manage the modal state
    const storeModal = useStoreModal();

    const [loading, setLoading] = useState(false);

    // This is the react hook form that will be used to manage the form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });

    // This is the function that will be called when the form is submitted
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);

            // Here you can call the API to create the store
            const response = await axios.post("/api/stores", values);

            // After the store is created, you can redirect the user to the store dashboard
            window.location.assign(`/${response.data.id}`);

            console.log(response.data);
            // await createStore(values);
            // After the store is created, you can close the modal
            storeModal.onClose();
        } catch (error) {
            toast.error("Something went wrong. Please try again.")
            console.log("Store Modal Error", error);
        } finally {
            setLoading(false);
        }
    }

    // This is the modal that will be used to create a new store
    return (<Modal
        title="Create a new store"
        description="Add a new store to manage products and categories"
        isOpen={storeModal.isOpen}
        onClose={storeModal.onClose}
        >
        

        <div>
            <div className="space-y-4 py-2 pb-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} >
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem > 
                                <FormLabel>
                                    Store name
                                </FormLabel>
                                <FormControl>
                                    <Input 
                                        disabled={loading}
                                        placeholder="E-commerce" 
                                        {...field} 
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>

                        )} 
                    />

                    <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                            <Button 
                                disabled={loading}
                                variant="outline" 
                                onClick={storeModal.onClose}>
                                    Cancel
                            </Button>
                            <Button
                                disabled={loading} 
                                type="submit">
                                    Continue
                            </Button>
                    </div>
                    </form>
                </Form>
            </div>
        </div>
        
    </Modal>)
    
}   