import React from 'react'
import { Link } from 'react-router-dom';
export default function Hello() {
  return (
    <>
    <div class="px-4 py-5 my-5 text-center">
      <img class="d-block mx-auto mb-4 rounded-circle" src="https://media.istockphoto.com/id/882396802/photo/flight-search-on-internet-buy-ticket-online.jpg?s=2048x2048&w=is&k=20&c=U5cMkroNPaIj_IuPV0m8IOfMbP5V1RG0LEfLkn7_spY=" alt="" width="100" height="100"/>
      <h1 class="display-5 fw-bold my-3">Unlock the Power: Create Your Own Ticket!</h1>
      <div class="col-lg-6 mx-auto">
        <p class="lead mb-4">Empower yourself with the ability to create your own ticket for events, experiences, or services. Take control of your bookings and reservations by crafting a ticket that suits your needs and preferences. Whether it's for a concert, a workshop, a trip, or any other occasion, the power to create your ticket lies in your hands. Customize details such as event name, date, time, location, ticket type, and more to tailor the experience exactly as you desire. Don't wait for opportunities, create them with your personalized ticket!</p>
        <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <Link to="/ticket_list" class="btn btn-primary btn-lg px-4 gap-3">Go to Ticket</Link>
        </div>
      </div>
    </div>
    </>
  )
}
