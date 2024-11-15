(function() {
    class FilterAndPrintManager {
        constructor(keywords) {
            this.keywords = keywords;
            this.observer = null;
            this.initMutationObserver();
    
            this.handleElementAdded = this.handleElementAdded.bind(this);
        }
    
        initMutationObserver() {
            const config = { childList: true, subtree: true };
            const callback = (mutationsList, observer) => {
                for (const mutation of mutationsList) {
                    if (mutation.type === 'childList') {
                        mutation.addedNodes.forEach((node) => {
                            if (node.nodeType === 1 && node.matches('[role="option"].dijitValidationTextBoxLabel')) {
                                this.handleElementAdded(node);
                            }
                        });
                    }
                }
            };
    
            this.observer = new MutationObserver(callback);
            this.observer.observe(document.body, config);
        }
    
        handleElementAdded(element) {
            const textContent = element.textContent || element.innerText;
            if (/^\d{3}/.test(textContent)) {
                this.uploadToClipboard(textContent);
            }
        }
    
        uploadToClipboard(textContent) {
            const extractedNumbers = textContent.split('-')[0].match(/\d{3,}/);
            const result = extractedNumbers ? '/' + extractedNumbers[0] : '';
            const matchingKeyword = this.keywords.find(kw => kw.keyword === result);
    
            if (matchingKeyword) {
                navigator.clipboard.writeText(matchingKeyword.snippet)
                    .then(() => console.log(`Snippet copied to clipboard: ${matchingKeyword.snippet}`))
                    .catch(err => console.error(`Error copying to clipboard: ${err}`));
            } else {
                console.error(`Keyword not found: ${result}`);
            }
        }
    
        disconnectObserver() {
            if (this.observer) {
                this.observer.disconnect();
            }
        }
    }
    
    
// JavaScript source code
var keywords = [
    {
        "keyword": "*avis",
        "snippet": ""
    },
    {
        "kzeyword": "one-t",
        "snippet": "one-time courtesy"
    },
    {
        "keyword": "Veh",
        "snippet": "Vehicle"
    },
    {
        "keyword": "veh",
        "snippet": "vehicle"
    },
    {
        "keyword": "cs",
        "snippet": "the customer "
    },
    {
        "keyword": "Cs",
        "snippet": "The customer "
    },
    {
        "keyword": "bd",
        "snippet": "business days "
    },
    {
        "keyword": "/35",
        "snippet": "Advised customer to wait 3-5 business days."
    },
    {
        "keyword": "/57",
        "snippet": "Advised customer to wait 5-7 business days."
    },
    {
        "keyword": "/10",
        "snippet": "Sending to pending 10: "
    },
    {
        "keyword": "/g203",
        "snippet": "Set Dropoff Gas from {cursor} to 0."
    },
    {
        "keyword": "/p018",
        "snippet": "Sending to pending 10: GASCHG from {cursor} to 0."
    },
    {
        "keyword": "/dci-open",
        "snippet": "Sending to DCI queue - Open Status"
    },
    {
        "keyword": "/.",
        "snippet": "An updated receipt was sent."
    },
    {
        "keyword": "--",
        "snippet": "No changes were made to the account."
    },
    {
        "keyword": "/-",
        "snippet": "      "
    },
       {
        "keyword": "/manager",
        "snippet": "Sent to a manager for approval."
    },
    {
        "keyword": "/minus",
        "snippet": "Minus adjustment of {cursor} on 203."
    },
    {
        "keyword": "/032-smoke",
        "snippet": '       ֎  CCI PS VRI  ֎\n' +
            '[P] Cs wanted to let us know the vehicle smelled of smoke.\n' +
            '[A] apologized. Offered 20% off as per the negotiation matrix.\n' +
            '[R] {cursor}'
    },
    {
        "keyword": "/nrp",
        "snippet":'        ֎  CCI PS VRI  ֎ \n' +
            '[P] The customer wanted to get his NRP (Non-refundable total) for the unused days on a prepaid reservation. \n' +
            '[A] Offered to help. Quoted NRP policy. offered to refund NRP.\n' +
            '[R] Sending to prepaid queue: Please refund {cursor} NRP.'
    },
    {
        "keyword": "/30",
        "snippet": 'Name: \n' +
            'RA #/Res #: \n' +
            'Adj. Amount: (USD or CAD): \n' +
            'DBR/Reason Code: \n' +
            'CID on File or Sent: \n'
    },
    {
        "keyword": "3-day",
        "snippet": "3-day voucher"
    },

    {
        "keyword": "/080",
        "reason": "Request Ra/No Signature",
        "scenario": "Customer is calling to get a copy of his receipt or a copy of his RA",
        "snippet": `    ֎  CCI PS VRI  ֎
[P] Customer requested a receipt.
[A] [080] Offered assistance to fulfill the request.
[R] [080] Sent the requested receipt to the customer.`
    },
    {
        "keyword": "/1200",
        "reason": "Explanation Of Ra / Statement",
        "scenario": "Customer is calling to get an explanation of his RA, explained the charges, upheld them, and didn´t make any refunds.",
        "snippet": `    ֎  CCI PS VRI  ֎
[P] Cs wanted to know why the bill was higher than expected
[A] Explained RA
[R] No changes were made to the account`
    },
    
    {
    "keyword": "/006",
    "reason": "Rate Default",
    "scenario": "Customer is being charged more than he was quoted and there is a Blue Banner on Res to Rental and AMP Screen. Early vehicle pick-up, return to a different location, early vehicle return. Rate Shop due to Destination Restriction [dropping off at an unallowed location] Blackout in effect: If Wizzard applied the rate, uphold. End of Day invalid for Rate Night Overstay Under stay",
    "snippet": `    ֎  CCI PS VRI  ֎
[P] The customer would like to know why his bill is higher than expected.
[A] Offered to help. The base rate defaulted. Offered to adjust the base rate back to the original.
[R] {cursor}`
},
{
    "keyword": "/010",
    "reason": "Incorrect Check-in/Checkout",
    "scenario": "(type 010 on the XVR search bar to get help document)",
    "snippet": `      ֎  CCI PS VRI  ֎
[P] The Customer wanted to check why the rental was still open.
[A] [010] Discrepancy on WZTTRC, Veh inventory date: {cursor}
[R] [010] Sending to DCI - Status: IN PROGRESS. 
Advised customer to wait 3-5 business days.

[PROBING QUESTIONS]
At what date and time was the vehicle returned? 
To which location was the vehicle returned? 
Was the vehicle returned to an [ Avis | Budget | Payless ] location? 
What was done with the keys? 

[WZTTRC Information]
`

},
{
    "keyword": "/011",
    "reason": "Incorrect Mileage Charge",
    "scenario": "Customer is disputing mileage fee.",
    "snippet": `    ֎  CCI PS VRI  ֎
[P] The customer would like to dispute the cost of the mileage.
[A] Offered to help.
[R] Mileage cost adjusted.`
},
{
    "keyword": "/012",
    "reason": "Coupon Not Applied",
    "scenario": "Customer is calling because his coupon was not applied to the rental.",
    "snippet": `    ֎  CCI PS VRI  ֎
[P] The customer would like to know why his bill was higher than expected.
[A] Coupon/voucher was not applied. Offered to help.
[R] {cursor}`
},
{
    "keyword": "/013",
    "reason": "Duplicate Billing",
    "scenario": "Customer has 2 or more rental agreements with the same dates.",
    "snippet": `    ֎  CCI PS VRI  ֎
[P] The customer would like to know why there is a duplicate charge on the bank statement.
[A] Offered to help. {cursor}
[R] `
},
{
    "keyword": "/014",
    "reason": "Claims Did Not Rent",
    "scenario": "Customer is disputing the charges on the rental since he states he never picked up the car.",
    "snippet": `    ֎  CCI PS VRI  ֎
[P] Preferred cs did not pick up the rental 
[A]  {cursor}
[R] [014] Sending to DCI - IN PROCESS

What is the date and amount charged on your billing statement?  
Is it an actual charge or does it still show as a pending charge? 
Are you viewing the charge from your monthly credit card or bank statement? 
What does the statement list as the name of the transaction? 
Is there anything displayed in the reference field of that transaction? 
Are you an Avis Preferred/Budget Fastbreak customer? 
Did you recently make a reservation that you canceled?
If so, did you call to cancel the reservation? 
If yes, when did you call to cancel? 
`
},
{
    "keyword": "/016",
    "reason": "Upgrade/Downgrade Dispute",
    "scenario": "Customer called in disputing the charge for an upgrade. The customer called in because they got a different vehicle class than what was reserved.",
    "snippet": `    ֎  CCI PS VRI  ֎
[P] The Customer called in disputing the charge for an upgrade. 
[A] Offered to help. The customer pushed back.
[R] {cursor}`
},
{
    "keyword": "/017",
    "reason": "One Way Fee",
    "scenario": "Customer is disputing a one-way fee.",
    "snippet": `    ֎  CCI PS VRI  ֎
[P] The customer is disputing the one-way fee. 
[A] Offered to help. Upheld, the customer pushed back; offered 50% off, and the customer agreed.
[R] {cursor}`
},
{
    "keyword": "/018",
    "reason": "Refueling",
    "scenario": "Customer is disputing refueling charges.",
    "snippet": `    ֎  CCI PS VRI  ֎
[P] Cs wanted to know why the bill was higher than expected
[A] [018] Found fuel charge with no info on SEC. Apologized. Charge under 60 USD. Offered to remove fuel charge as a one-time courtesy
[R] [018] {cursor}. Updated receipt sent. Advised customer to wait 3-5 business days.

[Probing Questions for a charge over 60USD]
What is the name of the gas station? 
Where was this gas station located? 
When did you fill-up the gas tank? 
How much did you spend on fuel? 
How many gallons of fuel did you put in? 

[SEC INFO]

`
},
{
    "keyword": "/020",
    "reason": "LDW",
    "scenario": "Customer is disputing Loss Damage Waiver coverage.",
    "snippet": `    ֎  CCI PS VRI  ֎
[P] The customer is disputing the cost of Loss Damage Waiver coverage.
[A] Offered to help. Upheld, the customer pushed back; offered {cursor} 50% off, and the customer agreed.
[R] `
},
{
    "keyword": "/021",
    "reason": "PAI",
    "scenario": "Customer is disputing Personal Accident Insurance.",
    "snippet": `    ֎  CCI PS VRI  ֎
[P] The customer is disputing the cost of Personal Accident Insurance coverage.
[A] Offered to help. Upheld, the customer pushed back; offered {cursor} 50% off, and the customer agreed.
[R] `
},
{
    "keyword": "/022",
    "reason": "ALI",
    "scenario": "Customer is disputing Additional Liability Insurance/Supplemental Liability Insurance coverage.",
    "snippet": `    ֎  CCI PS VRI  ֎
[P] The customer is disputing the cost of the Additional Liability Insurance/Supplemental Liability Insurance coverage.
[A] Offered to help. Upheld, the customer pushed back; offered 30% {cursor} off, and the customer agreed.
[R] `
},

{
    "keyword": "/023",
    "reason": "PEP",
    "scenario": "Customer is disputing Personal Effects Protection/Emergency Sickness Plan coverage.",
    "snippet": `    ֎  CCI PS VRI  ֎
[P] The customer is disputing the cost of Personal Effects Protection/Emergency Sickness Plan coverage.
[A] Offered to help. Upheld, the customer pushed back; offered {cursor} 50% off, and the customer agreed.
[R] `
},
{
    "keyword": "/032",
    "reason": "Vehicle Cleanliness",
    "scenario": "Customer called in to make a complaint about receiving a dirty vehicle.",
    "snippet": `    ֎  CCI PS VRI  ֎ 
[P] Cs wanted to let us know the vehicle was dirty upon pickup:{cursor}. 
[A] Appl. Offered 20% OFF T&&M on Current Rental.
[R] `
},
{
    "keyword": "/033",
    "reason": "Vehicle Mechanical",
    "scenario": "Customer called in to make a complaint regarding the mechanical issues with the car.",
    "snippet": `    ֎  CCI PS VRI  ֎ 
[P] Cs wanted to let us know the vehicle has a mechanical issue.
[A] Offered to help. Offered 20% off as per neg matrix.
[R] {cursor}`
},
{
    "keyword": "/034",
    "reason": "Employee Indifference",
    "scenario": "Customer called in to make a complaint regarding the inappropriate behavior of an employee.",
    "snippet": `    ֎  CCI PS VRI  ֎
[P] The customer called in to make a complaint regarding the inappropriate behavior of an employee.
[A] Offered to help.
[R] {cursor}`
},
{
    "keyword": "/035",
    "reason": "Excessive Wait",
    "scenario": "Customer called in to make a complaint about the excessive wait at the counter.",
    "snippet": `    ֎  CCI PS VRI  ֎
[P] Cs wanted to let us know the vehicle was checked out over 1 hour later than scheduled.
[A] Apologized. Offered 20% off as per the negotiation matrix.
[R] {cursor}`
},

{
    "keyword": "/038",
    "reason": "ERS",
    "scenario": "Customer called in to dispute the charge for ERS Service.",
    "snippet": `    ֎  CCI PS VRI  ֎
[P] The customer called in to dispute the charge for ERS Service.
[A] Offered to help. Upheld, cs pushed back; offered 30% {cursor} off, and cs agreed.
[R] `
},
{
    "keyword": "/042",
    "reason": "Reservation Failure",
    "scenario": "Customer went to pick up a car and there were no vehicles available.",
    "snippet": `    ֎  CCI PS VRI  ֎
[P] The customer went to pick up a car and there were no vehicles available.
[A] Apologized. Offered to change the pick-up location.
[R]  `
},
{
    "keyword": "/076",
    "reason": "Frequent Traveler Program",
    "scenario": "Customer called in asking about their frequent traveler miles.",
    "snippet": `    ֎  CCI PS VRI  ֎
[P] The customer wanted to know what had happened to his Frequent Traveling Miles.
[A] apologized. Checked if the rental met the requirements.
[R]  No changes were made to the account.`
},
{
    "keyword": "/095",
    "reason": "Damage",
    "scenario": "Customer is disputing damage charge.",
    "snippet": `    ֎  CCI PS VRI  ֎
[P] The customer called in to report existing damage.
[A] Noted.
[R] No changes were made to the account.`
},
{
    "keyword": "/182",
    "reason": "Damage",
    "scenario": "Customer is disputing damage charge.",
    "snippet": `    ֎  CCI PS VRI  ֎
[P] The customer called in to report existing damage: {cursor}.
[A] Noted.
[R] No changes were made to the account.`
},
{
    "keyword": "/098",
    "reason": "Cleaning fee.",
    "scenario": "Customer is disputing cleaning fee.",
    "snippet": `    ֎  CCI PS VRI  ֎ 
[P] Cs wanted to know why the bill had a cleaning fee.
[A] Apologized. Checked on DMP.
[R] `
},

{
    "keyword": "/121",
    "reason": "GPS",
    "scenario": "Customer is requesting a refund for GPS since he claims it didn´t work during the rental.",
    "snippet": `    ֎  CCI PS VRI  ֎
[P] The customer is requesting a refund for the GPS since he claims it didn´t work during the rental.
[A] Apologized. offered to refund the cost of the GPS as a one-time courtesy.
[R] {cursor}`
},
{
    "keyword": "/124",
    "reason": "XMR",
    "scenario": "Customer is requesting a refund for XMR since he claims it didn´t work during the rental.",
    "snippet": `    ֎  CCI PS VRI  ֎
[P] The customer is requesting a refund for the XMR Radio since he claims it didn´t work during the rental.
[A] Apologized. offered to refund the cost of the XMR Radio as a one-time courtesy.
[R] {cursor}`
},
{
    "keyword": "/140",
    "reason": "RSN",
    "scenario": "Customer is disputing Roadside Safety Net coverage.",
    "snippet": `    ֎  CCI PS VRI  ֎
[P] The customer is disputing Roadside Safety Net coverage.
[A] Apologized. Checked if the rental met the requirements.
[R] {cursor}`
},
{
    "keyword": "/230",
    "reason": "Additional Driver Fee.",
    "scenario": "Customer is disputing the ADR.",
    "snippet": `    ֎  CCI PS VRI  ֎
[P] The customer is disputing the cost of the additional driver.
[A] Apologized. Checked if the rental met the requirements.
[R] {cursor}`
},
{
    "keyword": "/231",
    "reason": "Underage Fee",
    "scenario": "Customer is disputing the UAS.",
    "snippet": `    ֎  CCI PS VRI  ֎
[P] The customer is disputing the cost of the underage fee.
[A] Apologized. Checked if the renter met the age requirements. Checked if the AWD included the underage fee.
[R] {cursor}`
},

{
    "keyword": "/1209con",
    "reason": "Reservation Transaction",
    "scenario": "Customer called in to cancel, modify, or confirm a reservation.",
    "snippet": `    ֎  CCI PS VRI  ֎
[P] The customer called in to modify a reservation.
[A] Offered to help and made the necessary changes.
[R] Reservation modified successfully.`
},
{
    "keyword": "/1263",
    "reason": "Prepay",
    "scenario": "Customer is inquiring about a prepayment.",
    "snippet": `    ֎  CCI PS VRI  ֎
[P] The customer would like to know what has happened to the pending refund,
[A] Offered to help.
[R] Sending to prepaid queue: Please refund the total of: {cursor}`
},
{
    "keyword": "/1266",
    "reason": "Loyalty",
    "scenario": "Customer called in to get points added/ customer called in asking about their budget bucks.",
    "snippet": `    ֎  CCI PS VRI  ֎
[P] The customer called in asking about their budget bucks.
[A] Offered to help. Checked if the rental met the requirements.
[R] `
},
{
    "keyword": "/9130",
    "reason": "Rental Extension Inquiry",
    "scenario": "The customer called in to extend the rental.",
    "snippet": `    ֎  CCI PS VRI  ֎
[P] The customer called in to extend the rental.
[A] Offered to help. Quoted extension total and fees.
[R] Rental extended successfully`
},
{
    "keyword": "/004",
    "reason": "Apply Quoted Rate",
    "scenario": "Customer is being charged for 1 additional hour/day and is disputing the charge. The customer is being charged more than what he was quoted, and he stayed under the rental parameters, there was a modification on the RES including a location change, downgrade/upgrade, and length of time. Use Rate Particular or Rate Shop to get the current estimated value of the rental.",
    "snippet": `      ֎  CCI PS VRI  ֎
[P] The customer would like to dispute the cost of the extra day/hour.
[A] Offered to help. 
[R] {cursor}`

}


];

//console.log(keywords);
    
    const filterAndPrintManager = new FilterAndPrintManager(keywords);
    
    // Assuming you want to expose the manager to the global scope for debugging or direct interaction:
    window.filterAndPrintManager = filterAndPrintManager;
})();
