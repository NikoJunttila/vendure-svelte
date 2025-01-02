<script lang="ts">
	import { browser } from '$app/environment';

	import ProductList from '$components/ProductList.svelte';

	import {
		graphql,
		SetOrderShippingAddressStore,
        SetCustomerForOrderStore,
        SetOrderBillingAddressStore,
        TransitionOrderToStateStore,
        SetOrderShippingMethodStore,
        AddOrderPaymentStore,
		type CreateAddressInput,
		type CreateCustomerInput,
        type PaymentInput,
	} from '$houdini';

	const shippingAddStore = new SetOrderShippingAddressStore();
    const customerStore = new SetCustomerForOrderStore()
    const billingAddr = new SetOrderBillingAddressStore()
    const transition = new TransitionOrderToStateStore()
    const shippingMethod = new SetOrderShippingMethodStore()
    const payment = new AddOrderPaymentStore()

    const dummyPayment : PaymentInput = {
        metadata : "stuff",
        method: "standard-payment"
    }

	const dummyAddress: CreateAddressInput = {
		city: 'New York',
		company: 'Dummy Company',
		countryCode: 'US',
		customFields: null, // Adjust based on your schema if needed
		defaultBillingAddress: true,
		defaultShippingAddress: false,
		fullName: 'John Doe',
		phoneNumber: '123-456-7890',
		postalCode: '10001',
		province: 'NY',
		streetLine1: '123 Main Street',
		streetLine2: 'Apt 4B'
	};
	const dummyCustomer: CreateCustomerInput = {
		emailAddress: 'john.doe@example.com',
		firstName: 'John',
		lastName: 'Doe',
		phoneNumber: '123-456-7890',
		title: 'Mr.',
		customFields: null // Adjust based on your schema if needed
	};
    async function updateCustomer() {
		console.log('trying to add addr');
		try {
			const result = await customerStore.mutate({
				input : dummyCustomer
			});

			console.log(result);
		} catch (e) {
			console.log(e);
		}
	}
	async function updateAddr() {
		console.log('trying to add addr');
		try {
			const result = await shippingAddStore.mutate({
				input: dummyAddress
			});
            const result2 = await billingAddr.mutate({
				input : dummyAddress
			});
			console.log(result, result2);
		} catch (e) {
			console.log(e);
		}
	}
    async function transitionOrderState(){
        try{
            const res = await transition.mutate({
                state: "ArrangingPayment"
            })
            console.log(res)
        }catch(e){
            console.log(e)
        }
    }

    async function setShippingMethod(){
        try{
            const res = await shippingMethod.mutate({
                id: ["1"]
            })
            console.log(res)
        }catch(e){
            console.log(e)
        }
    }
    async function addPayment(){
        try {
            const res = await payment.mutate({
                input:dummyPayment
            })
            console.log(res)
        } catch (e) {
            console.log(e)
            
        }
        
    }
</script>

<h1>
	<section class="grid grid-cols-3">
		<div>
            <button class="btn" onclick={updateAddr}>Addr</button>
            <button class="btn" onclick={updateCustomer}>Customer</button>
            <button class="btn" onclick={transitionOrderState}>Transition state</button>
            <button class="btn" onclick={setShippingMethod}>shipping method</button>    
            <button class="btn" onclick={addPayment}>add payment</button>     
        </div>
		<div>
			<ProductList />
		</div>
		<div></div>
	</section>
</h1>
