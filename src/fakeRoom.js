export const room = {
    id: "adsd",
    name: "Tran Quoc Huy",
    slug: "tran-quoc-huy",
    type: "1vs1",
    createdAt: new Date(),
    updatedAt: new Date(),
    members: [
        {
            idMember: "you123",
            avatar: require("@/assets/images/messenger-1.png"),
            fullName: "Phillip",
            slug: "phillip",
        },
        {
            idMember: "6291056455a29ebc13a050ed",
            avatar: require("@/assets/images/user.png"),
            fullName: "Mehmet",
            slug: "mehmet",
        }
    ],
    messagesData: [
        {
            idUser: "you123",
            messages: [
                {
                    text: "Hello m8!",
                    time: "15:02",
                    isReplay: false,
                },
                {
                    text: "I have send the files back to ya it only took me about 60 mins this time was with testing too.",
                    time: "15:03",
                    isReplay: true,
                },
            ],
        },
        {
            idUser: "6291056455a29ebc13a050ed",
            messages: [
                {
                    text: "Thank you Phillip!",
                    time: "15:07",
                    isReplay: false,
                },
            ],
        },
        {
            idUser: "you123",
            messages: [
                {
                    text: "Hello m8!",
                    time: "15:02",
                    isReplay: false,
                },
                {
                    text: "I have send the files back to ya it only took me about 60 mins this time was with testing too.",
                    time: "15:03",
                    isReplay: true,
                },
            ],
        },
        {
            idUser: "you123",
            messages: [
                {
                    text: "Hello m8!",
                    time: "15:02",
                    isReplay: false,
                },
                {
                    text: "I have send the files back to ya it only took me about 60 mins this time was with testing too.",
                    time: "15:03",
                    isReplay: true,
                },
            ],
        },
    ]
}