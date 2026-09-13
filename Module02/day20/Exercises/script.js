// 1

async function getUSDToETBRate(){
    const url="https://open.er-api.com/v6/latest/ETB";
    try{
        const res=await fetch(url);
        if(!res.ok){
            throw new Error (`HTTP error! Status:${res.status}`);
        }
        // the second await to read the result and to parse it 
        const data =await res.json();
        const rate= data.rates.USD;
        console.log(`Current USD to ETB Rate: ${rate}`);
        return rate ;
    }catch(error){
        console.log("Failed to fetch exchange rate:" , error.message);
    }
}
getUSDToETBRate();

// 2
async function displayUserProfile() {
  const url = 'https://typicode.com';
  
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    
    const userData = await response.json();
    renderUser(userData);
  } catch (error) {
    console.error("Could not display profile:", error.message);
  }
}

// Execution
displayUserProfile();

// 3
async function demonstrateErrorHandling() {
  // Scenario A: Deliberately wrong URL (Network/DNS failure)
  console.log("--- Starting Scenario A (Invalid Domain) ---");
  try {
    await fetch('https://this-domain-does-not-exist-at-all-12345.com');
  } catch (error) {
    console.log("✅ Caught by catch block! Network request failed entirely.");
    console.log(`Error Message: ${error.message}\n`);
  }

  // Scenario B: Real URL returning 404 (Server responds, but resource missing)
  console.log("--- Starting Scenario B (Real URL, 404 Status) ---");
  try {
    const response = await fetch('https://typicode.com');
    
    console.log(`Fetch finished. response.ok is: ${response.ok}`);
    console.log(`HTTP Status Code is: ${response.status}`);
    
    if (!response.ok) {
      throw new Error(`Custom Error: Server returned status ${response.status}`);
    }
    
    const data = await response.json();
    console.log("This line won't run.", data);
  } catch (error) {
    console.log("✅ Caught by catch block because we explicitly checked !response.ok and threw an error.");
    console.log(`Error Message: ${error.message}`);
  }
}

// Execution
demonstrateErrorHandling();

// 4
async function fetchParallelDetails() {
  const listUrl = 'https://typicode.com';
  
  try {
    const response = await fetch(listUrl);
    if (!response.ok) throw new Error("Failed to fetch list");
    const posts = await response.json();
    
    // Pick the first two items
    const item1 = posts[0];
    const item2 = posts[1];
    
    console.log(`Targeting Post ID ${item1.id} and Post ID ${item2.id}. Fetching details in parallel...`);
    
    // Create an array of fetch promises
    const promise1 = fetch(`https://typicode.com/${item1.id}`).then(res => res.json());
    const promise2 = fetch(`https://typicode.com/${item2.id}`).then(res => res.json());
    
    // Run them concurrently
    const [details1, details2] = await Promise.all([promise1, promise2]);
    
    console.log("Parallel fetch complete!");
    console.log("Item 1 Detail Title:", details1.title);
    console.log("Item 2 Detail Title:", details2.title);
  } catch (error) {
    console.error("Parallel fetch failed:", error.message);
  }
}

// Execution
fetchParallelDetails();

// 5 - index.html
