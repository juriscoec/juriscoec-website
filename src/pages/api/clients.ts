import type { APIRoute } from 'astro'
import type { ClientData } from '../../../types'
import { db } from '../../db'
import { isValidEmail, isValidPhone } from '../../lib/utils'

export const POST: APIRoute = async ({ request }) => {
  try {
    // Verify that content-type is JSON
    const contentType = request.headers.get('content-type')
    if (!contentType?.includes('application/json')) {
      return new Response(
        JSON.stringify({ 
          error: 'Content-Type must be application/json' 
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    const body: ClientData = await request.json()
    const { nombre, email, telefono } = body

    // Required fields validation
    if (!nombre || !email || !telefono) {
      return new Response(
        JSON.stringify({ 
          error: 'Fields nombre, email and telefono are required' 
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    // Validate that fields are strings and not empty
    if (typeof nombre !== 'string' || nombre.trim().length === 0) {
      return new Response(
        JSON.stringify({ 
          error: 'Name must be a valid text and cannot be empty' 
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    if (typeof email !== 'string' || !isValidEmail(email)) {
      return new Response(
        JSON.stringify({ 
          error: 'Email must have a valid format' 
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    if (typeof telefono !== 'string' || !isValidPhone(telefono)) {
      return new Response(
        JSON.stringify({ 
          error: 'Phone must have a valid format' 
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    // Clean and normalize data
    const cleanName = nombre.trim()
    const cleanEmail = email.trim().toLowerCase()
    const cleanPhone = telefono.trim()

    // Try to insert into database
    const result = await db.query(
      'INSERT INTO juriscoec_clientes (nombre, email, telefono) VALUES ($1, $2, $3) RETURNING *',
      [cleanName, cleanEmail, cleanPhone]
    )

    return new Response(JSON.stringify({
      success: true,
      data: result.rows[0],
      message: 'Client registered successfully'
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (error: any) {
    console.error('Error registering client:', error)

    // Handle PostgreSQL constraint errors (duplicate values)
    if (error.code === '23505') {
      let message = 'A client with these details already exists'
      
      if (error.constraint?.includes('email')) {
        message = 'A client with this email is already registered'
      } else if (error.constraint?.includes('telefono')) {
        message = 'A client with this phone number is already registered'
      }

      return new Response(
        JSON.stringify({ 
          error: message,
          type: 'duplicate_value'
        }),
        {
          status: 409,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    // Generic server error
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        type: 'server_error'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
}
