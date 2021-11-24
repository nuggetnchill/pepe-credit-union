import 'regenerator-runtime/runtime';
import React from 'react';
import { login, logout } from './utils';
import './global.css';
import Big from 'big.js';

import peepoWave from './assets/peepo-wave-3D.gif'
import pepeBank from './assets/pepe-bank.png'
import pepeCoin from './assets/pepe_coin.gif'
import pepeSad from './assets/pepe-sad.png'

import getConfig from './config';
const { networkId } = getConfig(process.env.NODE_ENV || 'development');

const BOATLOAD_OF_GAS = Big(3).times(10 ** 13).toFixed();

export default function App() {
  // use React Hooks to store greeting in component state

  // when the user has not yet interacted with the form, disable the button
  const [pepeBalance, setPepeBalance] = React.useState('');

  // after submitting the form, we want to show Notification
  const [showNotification, setShowNotification] = React.useState(false);

  // The useEffect hook can be used to fire side-effects during render
  // Learn more: https://reactjs.org/docs/hooks-intro.html
  React.useEffect(
    () => {
      if (window.walletConnection.isSignedIn()) {
        window.contract.ft_balance_of({account_id: window.accountId})
        .then((balance)=>{
          setPepeBalance(balance);
        })
        }
        console.log("pepe has connected")
      },

    // The second argument to useEffect tells React when to re-run the effect
    // Use an empty array to specify "only run on first render"
    // This works because signing into NEAR Wallet reloads the page
    []
  );

  // if not signed in, return early with sign-in prompt
  if (!window.walletConnection.isSignedIn()) {
    return (
      <main>
        <center><img id="hero-pepe" src={peepoWave}/></center>
        <h1>Hello there!</h1>
        <p style={{ textAlign: 'center'}}>Please confirm if you are a PEPE</p>
        <p style={{ textAlign: 'center', marginTop: '2.5em' }}>
          <button className="connect-btn" onClick={login}>I AM PEPE</button>
        </p>
      </main>
    );
  }

  return (
    // use React Fragment, <>, to avoid wrapping elements in unnecessary divs
    <>
    <div style={{float: 'left'}}>
      <p style={{margin: '10px 0', display: 'flex', alignItems:'center'}} > <span><img style={{marginRight:'10px'}} width='30px' src={pepeSad}/></span> Pepe {window.accountId.slice(0,-8)}</p>
      <p style={{margin: '10px 0', display: 'flex', alignItems:'center'}} >Balance: {pepeBalance}  <span><img style={{marginLeft:'5px'}} width='30px' src={pepeCoin}/></span>PEPE Coin</p>

    </div>
      <div style={{ float: 'right', display: 'flex' }}>
        <button style={{color:'#72616c'}} className="link" onClick={logout}>
        [Log out]
        </button>
      </div>
      <main>
          <h1 className="gradient-text">
           PEPE Credit Union
          </h1>
          {/* PEPE BANK IMG HERE */}
          <center> <img src={pepeBank}/> </center>
      <div className="doing-business">

 {/* STEP 1        */}
        <form
          onSubmit={async (event) => {
            event.preventDefault();

            try {
              // make an update call to the smart contract
              await window.contract.storage_deposit(
                {},
                  BOATLOAD_OF_GAS,
                  Big(0.00125).times(10 ** 24).toFixed()
                );
            } catch (e) {
              alert(
                'Something went wrong! ' +
                  'Maybe you need to sign out and back in? ' +
                  'Check your browser console for more info.'
              );
              throw e;
            } finally {
              // re-enable the form, whether the call succeeded or failed
            }
            // show Notification
            setShowNotification(true);

            // remove Notification again after css animation completes
            // this allows it to be shown again next time the form is submitted
            setTimeout(() => {
              setShowNotification(false);
            }, 11000);
          }}
        >
            <label>Step 1. You need a bank account  </label>
            <button 
                className="pepe-btn"
                disabled={false}
                style={{ borderRadius: '5px'}}
              >
                OPEN ACCOUNT
              </button>

        </form>
{/* STEP 2 */}
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            const {fundingAmount} = event.target.elements;
            try {
              // make an update call to the smart contract
              await window.contract.ft_mint(
                { 
                  receiver_id: window.accountId,
                  amount: fundingAmount.value
                },
                  BOATLOAD_OF_GAS,
                  Big(0.00001).times(10 ** 24).toFixed()
                );
            } catch (e) {
              alert(
                'Something went wrong! ' +
                  'Maybe you need to sign out and back in? ' +
                  'Check your browser console for more info.'
              );
              throw e;
            } finally {
            }
            // show Notification
            setShowNotification(true);

            // remove Notification again after css animation completes
            // this allows it to be shown again next time the form is submitted
            setTimeout(() => {
              setShowNotification(false);
            }, 11000);
          }}
        >
            <label
              style={{
              }}
            >
              Step 2. How much do you want?
            </label>
            <input
                autoComplete="off"
                defaultValue={'69'}
                id="fundingAmount"
                // onChange={(e) => setButtonDisabled(e.target.value === fundingAmount)}
                style={{ width:'100px'}}
              />

              <button 
                className="pepe-btn"
                disabled={false}
                style={{ borderRadius: '5px' }}
              >
                FUND ACCOUNT
              </button>
        </form>

{/* STEP 3 */}
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            const {fundingAmount,fundingAddress} = event.target.elements;
            try {
              // make an update call to the smart contract
              await window.contract.ft_mint(
                { 
                  receiver_id: fundingAddress.value,
                  amount: fundingAmount.value
                },
                BOATLOAD_OF_GAS,
                Big(0.00125).times(10 ** 24).toFixed()
                );
            } catch (e) {
              alert(
                'Something went wrong! ' +
                  'Maybe you need to sign out and back in? ' +
                  'Check your browser console for more info.'
              );
              throw e;
            } finally {
            }
            // show Notification
            setShowNotification(true);

            // remove Notification again after css animation completes
            // this allows it to be shown again next time the form is submitted
            setTimeout(() => {
              setShowNotification(false);
            }, 11000);
          }}
        >
            <label
              style={{
              }}
              style={{ display: 'flex', alignItems:'center'}}
            >
              Step 3. Open Account & Send <span><img style={{marginLeft:'5px'}} width='30px' src={pepeCoin}/></span> PEPE Coin to a friend
            </label>
            <input
                placeholder="Amount"
                autoComplete="off"
                id="fundingAmount"
                style={{ width:'150px'}}
              />
              <input
                placeholder="Wallet Address"
                autoComplete="off"
                id="fundingAddress"
                style={{ width:'300px'}}
              />

              <button 
                className="pepe-btn"
                disabled={false}
                style={{ borderRadius: '5px' }}
              >
                FULL SEND
              </button>
        </form>

{/* STEP 4 */}
<form
          onSubmit={async (event) => {
            event.preventDefault();
            const {fundingAddress} = event.target.elements;
            try {
               const response = await window.contract.ft_balance_of({
                account_id: fundingAddress.value
              })
              await alert(`Your friend ${fundingAddress.value.slice(0,-8)} has ${response} PEPE Coin`)
            } catch (e) {
              alert(
                'Something went wrong! ' +
                  'Maybe you need to sign out and back in? ' +
                  'Check your browser console for more info.'
              );
              throw e;
            } finally {
            }
            // show Notification
            setShowNotification(true);

            // remove Notification again after css animation completes
            // this allows it to be shown again next time the form is submitted
            setTimeout(() => {
              setShowNotification(false);
            }, 11000);
          }}
        >
            <label
              style={{
              }}
              style={{ display: 'flex', alignItems:'center'}}
            >
              Step 4. Double check to make sure your friend has received Pepe Coin
            </label>
              <input
                autoComplete="off"
                id="fundingAddress"
                style={{ width:'300px'}}
              />
              <button 
                className="pepe-btn"
                disabled={false}
                style={{ borderRadius: '5px' }}
              >
                Check
              </button>
        </form>

        </div>

        <hr />
        <p style={{fontSize:"10px"}}>Thank you for choosing PEPE Credit Union - Branch Manager: Pepe Nugget</p>
      </main>
      {showNotification && <Notification />}
    </>
  );
}

// this component gets rendered by App after the form is submitted
function Notification() {
  return (
    <aside>
       PEPE Banker is working...
      <footer>
        <div>✔ Succeeded</div>
        <div>Just now</div>
      </footer>
    </aside>
  );
}