
const main = function () {


	console.log("main");

	/*
		I found a site that lets you easilly generate mock api calls
		https://www.mocky.io/

		I just put this in the body section:

		{
			"text":"hello"
		}

		and clicked "generate my http response"
		to get a link above in green.

		I made one that will return "{"text":"hello"}"
		http://www.mocky.io/v2/5dd3d97b2f00007100d4f7a0
	*/

	/*
		Note:
		Ive used shorthand functions here (fat arrow functions)
		() => {}

		like let and const over var, these functions use block scope as opposed to functional scope, and have NO CONTEXT.
		"this" inside a fat arrow function is exactly the same as what "this" is outside the function.
		You cannnot bind context to fat arrow functions at all.
		They are somewhat simpler than functional functions.
	*/

	/*
		Ive not used the fetch API before, its newish...
		https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
		wont work in IE.
	*/

	//Fetch returns a promise
	//You can go straight to the url in browser to see the response.
	const apiCallPromise = fetch("http://www.mocky.io/v2/5dd3d97b2f00007100d4f7a0");

	//We interact with the promise by adding callbacks using "then" method on the returned promise
	// The .then() method expects a callback function which expects one argument containing the resolved value of the promise.
	// The api calls resolved value will be a "response" object
	// see: https://developer.mozilla.org/en-US/docs/Web/API/Response
	apiCallPromise.then((response) => {

		/*
			We need to access the data that is returned from the server..
			We expect a javascript json object for this call, so we use the .json() call on the response (the .json() call is a method of Response class).
			Believe it or not that also returns a promise, so i guess if we were expecting lots of data in the API call the promise is there so that it can be decoded async
			and not block the user.
		*/
		const jsonPromise = response.json();

		// We interact with promises using .then()
		// The .then() method expects a callback function which in turn expects one argument containing the resolved value of the promise.
		// The resolved value of this promise is a pure json object.
		jsonPromise.then((json) => {

			//I expect this will be a json object {"text":"hello"}
			console.log(json); // expecting {"text":"hello"}
			console.log(json.text); // expecting "hello"

			document.body.appendChild(document.createTextNode("Response text:::: " + json.text));
		})

		//We handle errors with the promise with the .catch() call
		//Catch expects a callback function which expects one argument containing the error
		jsonPromise.catch((error) => {
			console.log("Something went wrong with the jsonPromise");
			console.error(error);
		})
	})

	apiCallPromise.catch((error) => {
		console.log("Something went wrong with the apiCallPromise");
		console.error(error);
	})

}

main();