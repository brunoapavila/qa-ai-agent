import { GoogleGenAI } from "@google/genai";
import * as dotenv from "dotenv";

dotenv.config();

export class GeminiProvider {

    private ai: GoogleGenAI;

    constructor(){

        this.ai =

        new GoogleGenAI({

            apiKey:

            process.env

            .GEMINI_API_KEY!

        });

    }


    private extractJson(

        text:string

    ){

        try{

            const clean =

            text

            .replace(/```json/g,"")

            .replace(/```/g,"")

            .trim();

            return JSON.parse(clean);

        }

        catch{

            console.log("");

            console.log(

            "❌ Erro parse Gemini"

            );

            console.log(text);

            console.log("");

            throw new Error(

            "JSON inválido"

            );

        }

    }



    async analyze(

        prompt:string

    ){

        const response =

        await this.ai.models

        .generateContent({

            model:

            "gemini-2.5-flash",

            contents:

            prompt

        });


        const text =

        response.text || "";


        console.log("");

        console.log(

        "🤖 GEMINI"

        );

        console.log("");

        console.log(text);

        console.log("");


        return this

        .extractJson(

            text

        );

    }

}