import "dotenv/config"
import { drizzle } from "drizzle-orm/neon-http"
import {neon} from "@neondatabase/serverless"

import * as schema from "../db/schema"

const sql = neon(process.env.DATABASE_URL!)

const db = drizzle(sql, {schema})

const main = async () => {
    try {
        console.log("seeding db")

        await db.delete(schema.courses)
        await db.delete(schema.userProgress)
        await db.delete(schema.units)
        await db.delete(schema.lessons)
        await db.delete(schema.challenges)
        await db.delete(schema.challengeOptions)
        await db.delete(schema.challengeProgress)

        

        

        await db.insert(schema.courses).values([
            
            {
                id: 1,
                title: "Series 1 - Thinking Edition",
                imageSrc: "/Series-1.png"
            },
            {
                id: 2,
                title: "Series 2 - Feeling Edition",
                imageSrc: "/Series-2.png"
            },
            {
                id: 3,
                title: "Series 3 - Doing Edition",
                imageSrc: "/Series-3.png"
            }
        ])

        await db.insert(schema.units).values([
            {
                id:1,
                courseId: 1,
                title: "Unit 1",
                description: "Learn the basics of spanish",
                order: 1
            }
        ])

        await db.insert(schema.lessons).values([
            {
                id: 1,
                unitId: 1,
                order: 1,
                title: "Vocabulary and language1",
              
            },
            {
                id: 2,
                unitId: 1,
                order: 2,
                title: "Vocabulary and language2",
               
            },
            {
                id: 3,
                unitId: 1,
                order: 3,
                title: "Vocabulary and language3",
              
            },
            {
                id: 4,
                unitId: 1,
                order: 4,
                title: "Vocabulary and language4",
              
            },
            {
                id: 5,
                unitId: 1,
                order: 5,
                title: "Vocabulary and language5",
                
            },
            {
                id: 6,
                unitId: 1,
                order: 6,
                title: "Vocabulary and language6",
                
            },
            {
                id: 7,
                unitId: 1,
                order: 7,
                title: "Vocabulary and language7",
                
            }
        ])

        await db.insert(schema.challenges).values([
            {
                id: 1,
                lessonId: 1,
                type: "SELECT",
                order: 1,
                question: 'Anju was engrossed in reading her book. What is the meaning of engrossed?'
            },
            {
                id: 2,
                lessonId: 1,
                type: "SELECT",
                order: 2,
                question: 'What does it mean to have the jitters?'
            },
            {
                id: 3,
                lessonId: 1,
                type: "SELECT",
                order: 3,
                question: 'Sochu and Raju ran ______________ all around the house.'
            },
            {
                id: 4,
                lessonId: 1,
                type: "SELECT",
                order: 4,
                question: 'Nikola Tesla was a great ________ of the 19th century.'
            },
            {
                id: 5,
                lessonId: 1,
                type: "SELECT",
                order: 5,
                question: 'While the kids where scared of how strict their class teacher will be, a_______ old man came and dancing into the classroom'
            }
        ])

        await db.insert(schema.challengeOptions).values([
            {
                challengeId: 1, // which one of this is the man
                imageSrc: "/1-a-A.png",
                correct: true,
                text: "Focussed or lost in an activity.",
                audioSrc: "/1-a-A.mp3"
            },
            {
                challengeId: 1, // which one of this is the man
                imageSrc: "/1-a-B.png",
                correct: true,
                text: "Not liking something.",
                audioSrc: "/1-a-B.mp3"
            },
            {

                challengeId: 1, // which one of this is the man
                imageSrc: "/1-a-C.png",
                correct: true,
                text: "Lost in thought.",
                audioSrc: "/1-a-C.mp3"
            },
            {

                challengeId: 1, // which one of this is the man
                imageSrc: "/1-a-D.png",
                correct: true,
                text: "Completed something.",
                audioSrc: "/1-a-D.mp3"
            }
        ])

        await db.insert(schema.challengeOptions).values([
            {

                challengeId: 2, // which one of this is the man
                imageSrc: "/1-b-A.png",
                correct: true,
                text: "To have snacks to eat.",
                audioSrc: "/1-b-A.mp3"
            },
            {

                challengeId: 2, // which one of this is the man
                imageSrc: "/1-b-B.png",
                correct: true,
                text: "Having insects near you.",
                audioSrc: "/1-b-B.mp3"
            },
            {

                challengeId: 2, // which one of this is the man
                imageSrc: "/1-b-C.png",
                correct: true,
                text: "Shaking hard.",
                audioSrc: "/1-b-C.mp3"
            },
            {

                challengeId: 2, // which one of this is the man
                imageSrc: "/1-b-D.png",
                correct: true,
                text: "To be scared.",
                audioSrc: "/1-b-D.mp3"
            }
        ])

        await db.insert(schema.challengeOptions).values([
            {
                challengeId: 3, // which one of this is the robot
                imageSrc: "/1-c-A.png",
                correct: true,
                text: "here and there",
                audioSrc: "/1-c-A.mp3"
            },
            {
                challengeId: 3, // which one of this is the robot
                imageSrc: "/1-c-B.png",
                correct: true,
                text: "helter-skelter",
                audioSrc: "/1-c-B.mp3"
            },
            {
                challengeId: 3, // which one of this is the robot
                imageSrc: "/1-c-C.png",
                correct: true,
                text: "helter-jelter",
                audioSrc: "/1-c-C.mp3"
            },
            {
                challengeId: 3, // which one of this is the robot
                imageSrc: "/1-c-D.png",
                correct: true,
                text: "up and down",
                audioSrc: "/1-c-D.mp3"
            }
        ])

        await db.insert(schema.challengeOptions).values([
            {
                challengeId: 4, // which one of this is the robot
                imageSrc: "/1-d-A.png",
                correct: true,
                text: "thinker",
                audioSrc: "/1-d-A.mp3"
            },
            {
                challengeId: 4, // which one of this is the robot
                imageSrc: "/1-d-B.png",
                correct: true,
                text: "artist",
                audioSrc: "/1-d-B.mp3"
            },
            {
                challengeId: 4, // which one of this is the robot
                imageSrc: "/1-d-C.png",
                correct: true,
                text: "inventor",
                audioSrc: "/1-d-C.mp3"
            },
            {
                challengeId: 4, // which one of this is the robot
                imageSrc: "/1-d-D.png",
                correct: true,
                text: "philosopher",
                audioSrc: "/1-d-D.mp3"
            }
        ])

        await db.insert(schema.challengeOptions).values([
            {
                challengeId: 5, // which one of this is the robot
                imageSrc: "/1-e-A.png",
                correct: true,
                text: "golly",
                audioSrc: "/1-e-A.mp3"
            },
            {
                challengeId: 5, // which one of this is the robot
                imageSrc: "/1-e-B.png",
                correct: true,
                text: "molly",
                audioSrc: "/1-e-B.mp3"
            },
            {
                challengeId: 5, // which one of this is the robot
                imageSrc: "/1-e-C.png",
                correct: true,
                text: "holy",
                audioSrc: "/1-e-C.mp3"
            },
            {
                challengeId: 5, // which one of this is the robot
                imageSrc: "/1-e-D.png",
                correct: true,
                text: "jolly",
                audioSrc: "/1-e-D.mp3"
            }
        ])

        await db.insert(schema.challenges).values([
            {
                id: 4,
                lessonId: 2,
                type: "SELECT",
                order: 1,
                question: 'which of these is "the man"?'
            },
            {
                id: 5,
                lessonId: 2,
                type: "ASSIST",
                order: 2,
                question: '"the man"'
            },
            {
                id: 6,
                lessonId: 2,
                type: "SELECT",
                order: 3,
                question: 'which one of this is the robot?'
            }
        ])

        console.log("seeding finished")
    } catch (error) {
        console.error(error)
        throw new Error("Failed to seed the db")
    }
}

main()