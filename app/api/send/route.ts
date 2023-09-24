import { EmailTemplate } from '../../../components/email-template';
import { NextResponse } from 'next/server'; 
import * as React from 'react';
import { SMTPClient } from 'emailjs'; 
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
// connect to supabase
const supabase = createClientComponentClient();

export async function POST(request: Request) {

    const requestUrl = new URL(request.url)
    console.log(request)
    console.log(requestUrl)
    const formData = await request.formData()
        const name = String(formData.get('name'))
        const email = String(formData.get('email'))
        const message = String(formData.get('message'))
            const client = new SMTPClient({
                user: process.env.mail,
                password: process.env.password,
                host: 'smtp.gmail.com',
                ssl:true
                });
            
          try {
            const fromAddress: string = process.env.mail || '';
            const data = await client.sendAsync({
                from: fromAddress,
                to: 'snossyfox123@gmail.com',
                subject: 'Portfolio Client',
                text: `New message from portfolio contact form:
                    - Name: ${name}
                    - Email: ${email}
                    - Message: ${message}`,
            });

            console.log(data); 
            if (!data) {
                return NextResponse.redirect(
                    `${requestUrl.origin}?error=Could not send email`,
                    {
                    // a 301 status is required to redirect from a POST to a GET route
                    status: 301,
                    }
                )
            }
        
            try {
                await supabase
                    .from('contact')
                    .insert([
                        {
                            name: name,
                            email: email,
                            message: message, 
                        },
                    ])
                    .select();
            } catch (error) {
                console.log("Store Email Failed 😥");
            }


            return NextResponse.redirect(
                `${requestUrl.origin}?success=Your Email Was Sent Successfully`, {
            // a 301 status is required to redirect from a POST to a GET route
            status: 301,
            })
          } catch (error) {
            return NextResponse.json({ error });
          } 
}