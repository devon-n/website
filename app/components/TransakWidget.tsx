"use client"
import { TransakConfig, Transak } from '@transak/transak-sdk'
import { useEffect } from 'react';
import { GhostButton } from './buttons/GhostButton';

export const TransakWidget = () => {
  const transakConfig: TransakConfig = {
    apiKey: process.env.NEXT_PUBLIC_TRANSAK_API_KEY as string, // (Required)
    environment: Transak.ENVIRONMENTS.PRODUCTION // (Required)
    // .....
    // For the full list of customisation options check the link below
  }

  const transak = new Transak(transakConfig)

  const handleClick = () => {
    transak.init()
  }

  // To get all the events
  Transak.on('*', data => {
    console.log(data)
  })

  // This will trigger when the user closed the widget
  Transak.on(Transak.EVENTS.TRANSAK_WIDGET_CLOSE_REQUEST, () => {
    console.log('Transak SDK closed!')
    transak.close()
  })

  /*
   * This will trigger when the user has confirmed the order
   * This doesn't guarantee that payment has completed in all scenarios
   * If you want to close/navigate away, use the TRANSAK_ORDER_SUCCESSFUL event
   */
  Transak.on(Transak.EVENTS.TRANSAK_ORDER_CREATED, orderData => {
    console.log(orderData)
  })

  /*
   * This will trigger when the user marks payment is made
   * You can close/navigate away at this event
   */
  Transak.on(Transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, orderData => {
    console.log(orderData)
    transak.close()
  })

  return (
    <div id="transakMount">
        <GhostButton
        text="Buy XTZ"
        onClick={handleClick}
        />
    </div>
  )
}
