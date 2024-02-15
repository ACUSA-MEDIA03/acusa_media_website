import dotenv from "dotenv";
dotenv.config();

import asyncHandler from "express-async-handler";
import Contact from "../models/contactModel.js";

import Mailjet from "node-mailjet";

const mailjet = Mailjet.apiConnect(
	process.env.MAILJET_API_PUBLIC_KEY,
	process.env.MAILJET_API_PRIVATE_KEY
);

// @Desc Create a new contact
// @route POST /api/contact
// @access Public
const createContact = asyncHandler(async (req, res) => {
	try {
		const { name, email, message } = req.body;

		// Admin email format
		const request = mailjet.post("send", { version: "v3.1" }).request({
			Messages: [
				{
					From: {
						Email: "thetommedia@gmail.com",
						Name: "ACUSA MEDIA",
					},
					To: [
						{
							Email: `tomiwaadelae6@gmail.com`,
							Name: `ACUSA MEDIA`,
						},
					],
					Subject: `Contact form submission - ${name}`,
					TextPart: `New Contact Form Submission - ACUSA MEDIA`,
					HTMLPart: `<div 
                                    style="
                                        font-family: Montserrat, sans-serif;
                                        font-size: 15px;
                                    "
                                >
                                    <h1>Dear ACUSA MEDIA,</h1>
                                    <p>
                                        Exciting news! A new contact form submission has been successfully received via our website.
                                    </p>
                                    <p>
                                        The details are as follows:
                                    </p>
                                    <ul>
                                        <li>
                                            Name of Sender: ${name}
                                        </li>
                                        <li>
                                            Email Address: ${email}
                                        </li>
                                        <li>
                                            Message: ${message}
                                        </li>
                                    </ul>
                                    <p>
                                        Thank you for your attention to this matter. Your commitment to student satisfaction is truly appreciated
                                    </p>
                                    <p>
                                        Best regards,
                                    </p>
                                    <p>ACUSA MEDIA</p>
                                </div>
                        `,
				},
			],
		});

		const newContact = new Contact({
			name,
			email,
			message,
		});

		await newContact.save();

		// Send email to admin
		request
			.then(() => {
				res.status(201).json({ msg: "Email sent successfully!" });
				return;
			})
			.catch((err) => {
				return err;
			});
	} catch (err) {
		res.status(400);
		throw new Error(err);
	}
});

export { createContact };
