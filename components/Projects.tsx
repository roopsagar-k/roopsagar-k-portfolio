import { PinContainer } from "./ui/3d-pin";
import { cn } from "@/lib/utils";

export default function Projects() {
  const projects = [
    {
        id: 1,
        title: "QuestionpaperHub.vercel.app",
        href: "https://questionpaper-hub.vercel.app",
        cardTitle: "Question Paper Hub - Interactive Question Paper Sharing App",
        cardDescription: "A platform for uploading and sharing question papers with features like text extraction and interactive posts with help of GEMINI.",
        img: "./questionpaperhub.png",
        iconLists: ["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAC5UlEQVR4AbyUgWdCURTGs62QQAIJoKgI5C0BkwKgCCBKqGyEABREJABK/QsLQQHw9h8U0rASopCkoPS+na5bRq13e20dfnB993yf9849OsF6IpzEG9EkPoklseMs+VmTa5z8zs31SDwTNWJIbAmosOXaGr/7qNXcSpSJGQGNzHgP67XmEvFBKARuROG9JFHzF2JA4I8ZsN4qJWk2Fw8hXfrnMoF/Rj43Ew98WHAnytzzWD5iescAU+55fOvVSxfcbjfS6TQymQwkSbrY3OfzMa3f71cLUT3sCBcxvCBkDQ/V6/Xgcrl+1RYKBSwWCxSLRbUAX8ybr86tUABerVYLZrP5rDabzaLb7SKXy4lszFeC7W+IBBiPx5hMJlAUBaVSCXq9/kQbj8fRbreRTCZFZuGd0A0EA7DGqVQK6/Uaq9UKsVjsRBuJRFCv1xGNRkX3gm55TQCTyYRKpYJ9jUYjNnQ/tYFAAPl8HsFgUCAA89btRAN0Oh322S0WCwuzL1mWYbPZjlqv14tEIqH6Wji7qwMYDAZ25vF40O/32Xmj0YDRaGTndrsdoVAIDodDOMBSQwBGOBzGfD7HZrP5rr5qQTOEoihPi0UNouJABItG05pgE7EjJu26YDYKhvXeBMtX7GlgsRmX7PYoO+OuM98nwtiDWx+H+3N+0DQNGGMwDOPnTE3T5B7B51UAgiCgbVscx4F935EkCWhEiqJAkiTuJXxcBUAlyzKGYQC9dV3h+/4zlPw4J6ITAFSu62JZFtAjMKqqgtO6vXFQ8TkAqiiKQEu5bRvquoYoitxUzCVGVVUhTdNfP87zHPM8Y5omhGHILUa3yTF1h7o1jiO6roNt21xyfKshoflTt/q+R5ZlxA9chuRWS2ZZFoqiQFmWCIKAzvXUkt1uSh3HQRzHZEygaRqXKb3VlhMrkkZ4ngdd12l5uWz5rcGEWi/L8pckSR+CILz+STRjjL0zxl7+ZTi9Gs/rZ+L5N8AJA23K4ax1AAAAAElFTkSuQmCC", "https://www.svgrepo.com/show/374144/typescript.svg", "https://www.svgrepo.com/show/354200/postgresql.svg", "https://avatars.githubusercontent.com/u/108468352?s=48&v=4" ],
    },
    {
        id: 2,
        title: "Airbnb.clone",
        href: "https://github.com/roopsagar-k/Airbnb",
        cardTitle: "Airbnb clone - Comprehensive Accommodation Booking App",
        cardDescription: "An application for booking and managing accommodations with user authentication and booking functionality.",
        img: "./airbnb.jpeg",
        iconLists: ["https://www.svgrepo.com/show/374032/reactjs.svg", "https://www.svgrepo.com/show/354431/tailwindcss-icon.svg", "https://www.svgrepo.com/show/354119/nodejs-icon.svg", "https://www.svgrepo.com/show/354200/postgresql.svg"],
    },
    {
        id: 4,
        title: "animeSphere.onrender.com/",
        href: "https://anime-sphere.onrender.com",
        cardTitle: "Anime-Sphere - APIs Based Anime Explorer",
        cardDescription: "A web app to explore trending animes, get personalized recommendations, and search detailed information.",
        img: "./anime-sphere.png",
        iconLists: ["https://www.svgrepo.com/show/373574/ejs.svg", "https://www.svgrepo.com/show/452185/css-3.svg", "https://www.svgrepo.com/show/354119/nodejs-icon.svg"],
    },
    {
        id: 3,
        title: "Covid19.WHO.Insights",
        href: "https://github.com/roopsagar-k/Covid-19_data_analysis",
        cardTitle: "Covid data analysis - WHO Covid-19 Data Analysis and Visualization",
        cardDescription: "Provides insights and visualizations of COVID-19 data from WHO for better understanding of the pandemic.",
        imgClassName: "",
        img: "./covid.jpg",
        iconLists: ["https://www.svgrepo.com/show/452091/python.svg", "data:image/png;base64,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", "data:image/jpeg;base64,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", "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhUTEhMTFhIXGBgXGBgXGRcXGBoaHRgaFxoVGBcYHSggGhslHRgWITEhJSorLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGy4mICU3MDU0NS03MDA3LiszKy0uLS81LS0tKy0wKzc2Lzc3LS0yKy0vNS01LS0rKy8tNS83K//AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAgIDAQAAAAAAAAAAAAAABAUDBgIHCAH/xABFEAABAwEFBAYFCgUDBAMAAAABAAIDEQQFEiExQVFhcQYTIoGRoQcyM1KxFCNCU2JygpLB8BVDstHhNGOio8Lj8XPD0v/EABoBAQACAwEAAAAAAAAAAAAAAAADBQECBAb/xAAxEQEAAgECAwUHBAMBAQAAAAAAAQIDBBESITEFE0FRoWFxkbHR4fAyM4HxIiNCwQb/2gAMAwEAAhEDEQA/AOjUREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBEVzcvRe1WogRROodpyCCmRdt3L6IRkbTIfut/x/dbrdvQSxQ6RAne7/CDzrFZXu9VjncgT8FKZctoOkT/AAXpyG7om+rGwdwWZ7AGmgGiDy8+47QNYX+Ciy2ORvrRvHNpXqC5Wg2eL7jfgs0thid60bDzAQeUkXpW8ehlimrihaDvC02+fRDGamzyFp3HRB04i2G/Ohtrsp7cZLfebn++6q18hB8REQEREBERAREQEREBERAREQEREBTrpumW0vDImFxO4Gg5q16HdEpbdIA0UjHrO/su+uj3R2CxRhsbQCBm7bxQad0S9F0UQD7VR79cNMguwo4o4W5BrGDkB3qrtXSAHKBuL7ZyZ3bXfDiqmbFIayuLzsGjRyaMu85rkz63Fi5TO8+UOzT6HLm5xG0ecra13+NIW4vtnJnMbXd3ioFktcgnje97nVJaRo0Bwyo0ZagLCclgnkqOzUkUIOyoNR8FWx2jkvlr4V3Wk9mY6YbeNtm8LhLoeSroZ7RIA5rYWtIBBLnONDwAA819fBaKGs0fdGf1cr159luT/Txfcb8FOVHdUM5hjLZWBuEUBZWgppXEFLJtTdkL+9zD8CgsUVb/ABbD7WKSPjQPb+Zlad4Cm2e0MkGJjmubvBqg5SxNcKOAIOwioWi9K/RrBaQXwgRy5nIZE/v9hb6iDy/f/R6exvLZWEDY6mRVSvU98XRFaWGOVocD4hdFdOeg0licXsGKE7daINNREQEREBERAREQEREBERAWydCuislumAAIiHrO/RVNy3Y+0zNijBJcQOQrqvSHRe4o7HA2JgFado7ygw2SyiwANaK2Y0qaCsZpSppqw5cuWl60giozBRwrkdFUGtkO02Y/9H/x/wBPLQK+9rF1L8Q9k8/lcdnI5nnzCh4yfV8dn+VeCF1qzkqyD6LNHP8AtPOwbm+O5U0kLonmN+ozafebsPPYf8qm7R0u3+2v8/X6rzszV7/6b/x9Po4CMbczx/sua+oqddLzo3LWEN2sJZ4aeRCsZdDyWv3Famxvka9wa0gPqSAK+qczwDVZSXzBQgStPLtfBeswZO8x1t5w8dnx93ktTylzuT/Txfcb8FOVJdN7Qshja6RrSGgGuWzeVaRWuN4q17HDg4H4KVEyNkBJAIqNRtHNQ7TdUbjjbWOT32dl3fsd3grBd92NmYZjibJI5z2vaaODNGDiMIBocs1kktEsA+fGOMfzWDQfbZs5io5Ljx67DfJOPfaYnbn4+5jdw+Vyw+3GKP61g0++zUcxlyVlFIHAOaQQcwRmCuQNRwKq5rG6EmSzirdXxaA7yzY13DQ8NV2MrVU1rPyomJtOpBpI+mpH0GV26Vds010G1G1diIubF/MfmHHfE3cd52aa6WsELWNDWANaBQAZAIOgvSJ0MdY5DJGCYXEnktKXqm9rtZaInRSAFrhTMVpxXnHpbcD7FaHRuBw17J3hBSIiICIiAiIgIiICIrnohdJtVqjiAqK1dyCDtP0QdGBFF8pkHbfTDXYP3+q7KWKywCNjWN0aAB3LKg+Eqphb8pdjd7Bp7DffP1h3t90d+5ZLzJleLO05EYpSNQyuTebiKcg5WLGgAAZAZBBUkmynabMTzMRP/wBf9PLSTe1hEzOyQHjNjuO7kRkpxFVr1pnNlJjicCwgOAdUiAE0xGn8vcNmezTExExtLMTMTvCsEu8EOBoW7QRqF9oTrly18VPvK68DRMxznmlZCcy4a4xTduGxQ2muY0Xm9ZppwX5dJ6fR6jRaqM9Of6o6/UsjWtmiJAILi01z1GRz408Vtr2gNNABktOtFcJI1GY5g1HwW3slDow4aFtfEVVp2Zfiw8PlKp7Vx8Obi84+yNcorZ4vuN+CjX5YYyzKNvWPc1jSBQguNK1G4VPcpVyf6eL7jfggGO1NGyJhefvOqxvlj8l16jL3WK1/KPXwVkrGOLAAG6AAAHcBQUKqLbaWzTiCoDY6Pe2ubnD1WcQKhx44VYXrbDGzsCsrzhjH2jtPADM8lDF0RmIRuqSDix6OxnMvB2GpKo+ydLx276/SOnv8/wA8WlY8VgqmeZ1ocY4yREDSSQanfGw+ILtmzPSEy1vkcLO6QYcRaZQCDJQVMbToH7yONM9L+CFrGhrQA0CgA0AXom6stNl6g9bC3sgASRj6TR9Jo98eYy3Kzhla9oc0gtIqCNCFkVVZx1E3V/ypSXM+y/VzORHaH4uCC1Wmek3o0LXZi5o+dj7QPBbmvhFcjog8luBBociF8W2+ku4/ktsdhHYf2h+/DzWpICIiAiIgIiIC7c9CF05SWgjbhb8P7rqNekPR1d/U2GIbSMR+H6INmXCWQNBc40ABJPALmqrpFJ822MCpke1lK0qNXCp3gEd6xMxEbyMlyxnAZHCj5TjNdQPot7m076qxVaL4Y3KRr4vvig/MKt81Pila4VaQRvBqFitotG9Z3gmNuqPeVr6plQMTyQ1jfecdB+p4Ar5d9hEbSHHE92cjiPWP9tgG5YIR1toc8+pF2G7sZAL3dwo38ys1sKcg2U7TZT/0f/H/AE8tKy8bJ1L6t9i/Np2NOuGu45keG5bTIRQ4qYaGtdKbarVTEMOJ4eLCScArmzdI7b1dakCvZqDSmkWfDXNSaWTYM9sN4vVHx10FeOz/ACrK52SvhoJsLWVZhDATQadondTYq8scxxjfm4Zg7HNOjh+9VPuGSj5We80PHdVrv+1VXZ8WxZ7Yrfmy27RmubBXLX83Z7rs83UxlkwAwghrmBwGWlQQVMuBx6t0z6VkcXFw0wgYW0rnhoK/iURkhFiYG+u9rWN5uo0HurXuUq3tBLLJHkwNaZKbIxk1nNxHgDvXR2jFsvBgr/1PP2RCil8sDuuebQfVzbENzK5v4FxAPIBY55nWhxjiJbEDSSQbTtjjO/e7ZSmulfa4y50hsocIxlNhNA+hzbHueBUFwpu1zF9d7mGNhioI6dmm7cu/HjrjrFK9IZcJ7vjdF1WENaKYcOWEjQt3EFY7rtLnB0cntY8nfaH0ZANzgPEEbFPVZeg6t7JxsOB/FjiBU/dNDyqtxZqJedl6yMgZOFHNO5wNQfEfFSl9QR7vtPWxtfpUZjcdC08QajuUhVt39iWaPZUSN5PrX/k0n8SskHXvplunrLKJgO1GfL91XRa9SdIrIJrNKw7Wnyz/AEXl+0R4XObuJHgaIMaIiAiIgIiIMtkjxPY33nAeJovU92RYYY27mt+C8xXCytoiH2gvUTHtAGYQZVRXwa2iHcwtPe40HwKuusG8Khtzq2jX6UA83n9VDqP2r+6fk2p+qF2oUt1xVLg3A7XEwlh78OR71NquEx7JXgseW+Od6TMT7FvasW6wgWayzRNpFI1zczhkGdSantt4k6grN/E3N9rC9o95nzjf+PaHeFMSqtMPbWppyttaPb9Y+6C2lpPTkq7Za2WgshY4FriTJT3G0q07sRIFN1Vc4RSmxQJ7HHITjY00pQ0zHEOGYWIWF7fZTvbwf843zOLzVrh7cwW/cia+senP0c9tLeOnNWXvdxiAw+yBq0/VE6tP+0ch9k56DKJZbWGSMeaj1mOFKkVGlBrmBoru0Wq0NY4GJjzQgFjsq8WOzpyJWtWqIR0wOOyrXgse1w0cGnVtd2i7OLFntXJitEzHy8WceS2Olsd45T8/BbWK3twwmhIhZiw0ILpSOrjYK61q/PTJZrJG+XExrsi4meVuWJ+2OM7gABXYBTXTX22kO9oaMAGTRV2TcIw7jSuezEaarn/HbQWCKFhaAKVDe0eNBou7Dppvkm/LfpzmI2j3y4rWivVvEDWMAjbQADJo2AZaKFZh1U7o/oSAyNGwOBAeBzqHcy5a10bhtDbQJJGvoagl3HbnnrRbLezxWF4Iq2UeDgWEeY8FJlx93bh3ifbHQrbijfbZZrDa4Q9jmHRzS094oufWDeE6wbwo2yNdExfCwnWlDzHZPmCpirbncA2RtRlLJTvdi/VT+sG8IINq7Nohd7zXsPk4f0u8VYqtvR4xQEEZS/Frh+qn9YN4QfXioI3rzB0qs/V2udu558816e6wbwvOXpGZS8JuLifMoNZREQEREBERBY9H3UtMR+0F6WbdMFPZR/lC8v2GTDIx25zT5r1Nd8mKJjt7QfJBi/hEH1Uf5Qqa0WVjLRRrGgB0NKDfjr40C2dUV7ZWiL7ZZ4scT8HFQ6j9m/un5NqfqhadU3cFxljAByCyrBarTGwdt7W13nPuGpXgK1m07RG8riZiOrJ1TdwTqm7goUV5F4HVRPk+1kxtRkc3ZnPcFz+T2h/rSMjG6MVd+d+XkrHD2Tqsn/O0e3l6dfRDbU46+O7OWtGIuoAKGpyHiohvGI5RtdKf9tuIfmNG+aqL2ns8EjHOd1pbiDmvOPM0oc8gQRSg94qsnvi0Wp3VxDC0/RZllxP/AKCvNJ/8xxxx5LcvPpHx57/xzceTX7TtEc/jK2vG+iyoDY2O2N9o+vHD2W+JUFjZZ2vkkcerjDidBmATgaAKV3rNc9xAuoDWmT5BsP1cfHe7ZWgz0tr3uyNrW4BhLnRx0aSAW4gDiGhoKqwpotLg/arHLxnr67zHx+CG2bJaN7SpLEBFhdLE18biQatGJrgSCAdulac++8ua74nsMhjYQ9xLRQZN0A4aVpvJXCC7WSvna8u9YOaKmgxNBxAaVrXNVUEktmkcBTEPXb9Fw2PG6u/YRQrNs3BEWt0n0+357ttPTvqRw/q2328/d7fn89m/hEH1TPAKDed2wjqmtjYC6RoyA0oXHuo1WN3XgyZtW5Ees06tO4/3Udh620k/QhBb+N1CfBv9SnR9GX+EQfVR/lCfwiD6qP8AKFOWOeQNa5x0AJPICqCouu7YXh5MbD848CoGQBw0HgVN/hEH1Uf5QlyxlsLK6kFx5uJcfMqcgpLxu2FroQI2DFJQ0AzGFxofBTf4RB9VH+ULhbDWeFu4Pee4Bo/rVigg/wAIg+qj/KF599ItPl8oGQBoBuoTkvR7jQLzF0vtHWWyd32ygp0REBERAREQF6V6B2/rrFE6uYFD++8LzUu5PQjetY5LOTm04m8v38EHaSqekLDhjkFKxyNOelD2TWmzMHuVssVpgEjHMd6rgQeRyWLRFomJI5IIu6R3tZ3cox1Y8QS7zUizXdFHm1jQd9KuPNxzK4XPOXR0f7RhLH8xt7xQ96nLTHix442pWI9zM2meqssR6uaSL6L/AJ1nfQPaPxZ/jVd0ybOGYo3kR6OaMu8kbNit70spe0OZQSsOJhOldC08CCR38FzslobPHWmRq1zXag6FrhvCmpbhtFtt9vNrMbxs6+ua4pLSa6R7XH4DfyV7YmNafk7HNZGXFpmbUGSn8prtA8ZgkH6JpnWls53XHqYexC3sve3KtMjHHTwLtmzPSwdYYzH1RY3q6Uw7FPqdXk1E/wCXSOkR0hHjxVxxyZIIWsaGsAa0CgAyAUG8c5YG8Xv/ACtp8XBcW2aeL2bhIz3ZCQ4cBJQ1/F4rFZ5y+dxcxzCyMChoc3urUFp0owLhzTtjmWNRbhxWllsxw2j78QP5XU/7gvt93d1jcTKda3T7Q2sPA/GiwW6UsdA8Nc41cygpU4m1AFSBq0LMWWiXUthZ9k45PGmFvmtMG18URLGjvPd1mOsNYa8tIcwlrht2t2FrhtFdh3LYej9tZhEVMMgqSCa46mpeHfSqTU81Dva7BCBIyvV6SVJJr9YSdePiq6Rg44dQRq07wVX97fR5OC3Ok9Pz/wAeh7mmux8deV46+38827qtvg48EA1kPa/+NtC/xyb+JQrBfmEYZzoMngZHg4DR3kfJTrrhcS6aQUfJSgOrGD1W886nieCtaXrevFWd4VF8dqW4bRtKwAX1FGvC0iKNzznQZDeTkB3kgLdojWLtzyv2NwxDuq53m4D8KslEuyzdXG1pzd6zjvc7tOPiSpaCDfdqEUErzsaf7BeXbXLje93vOcfE1XevpevXqbEYwe1IQO7auhEBERAREQEREBbD0Dvg2W2Rvr2ScLu/L9ad615fQUHrKKQOaHA1BAIPArmtC9FHSUWmz9S93zsYA4kb/wB/ot9QVdt+ZlE38t1GS8Pck7iaHgRuVmuMkYcC1wBBFCDtCrbFKYXCCQnCfZPO0fVk+8B4jkUFqtctrTI+R1nDsNAJS0hokIObWE/TAyLu7XSbPM60OMcRLYgaSSDadscZ373bKU10soIWsaGtAa0CgAyAQYLsmjdGOqoGt7OGlC2n0SNhClqBa7tDndZG4xy+8NHcHt0cPPcQsQvJ8eU8ZH+4wF7DxIAq3vy4oLRVl35vndvfh/K0D4kqZDa43jEx7XDeCD8FDuUfMh3vl0n53F3wIXLq52x7OPXW2xbebheuUId7jmO7g4V8iVaqDa4ccL2e8wjyyXOyW1phZI5zWgtaSSQBmOK10c/4zDTQW3pMJTmggg5g5FanbbL1D8B9mc2HhtYeI2cOSu3XrjygYZD73qx88ZGf4arHJc5lBM8hc8js4cmMO9ra5nieOlVLqMFc1OGfyVtptRbBki8f3DXcO8djdu58FZXdejoey+rodh1cz/8ATfMcVEAcCWPFHtyI37nDgVw9X7vw/wAKgxZsulyTHxj8+b0eXDi1eOJ+E/nyblFIHAOaQQcwRoVXV6+bL2UJz3OkppxDQa8zwWvx2mSLEInEBwNW60r9NtcgeGhWzXO+IxNEJ7Iyz9YHbirni313q/waimau9f6ec1Gmvgtw2/tOXxfVrPT/AKQtsdmca/OO7LRXPNToHU3pXvz5RayxpqyMUHP9/FaQucshc4ucakmpK4ICIiAiIgIiICIiC26MX2+xztlYcgRiG8L0jct6MtMLZYzUOHgV5YW5ejzpi6xSYHmsDteBr5BB6EVNaz8qJiZ7Jp7cm9wPqRneDq7Zsz0G1G1dmEkQ5Y5BkTt6tnHSp2Vyz0tYIWsaGtADQKADQBBWWO0Gz0hloG6RyAUa7c13uv8AI+St1jmia9pa4BzTkQcwVXCCWD2VZYvcce237jjqOB8UFqviiWO8Y5MgaPGrHDC4c2lTEEK03VC+pLAHH6Q7LvELALpwto2WYACgGLIADIaK0XCXQ8liYierE1iesKi7bEZImPM01XNBNHZaclJstywsp2A4jQu7R7q6dy53J/p4vuN+CnJFYjpBFYjpD4AvqKNa7dHEO24DcNSeAaMz3LLKFft3l4EjB843Z7zdrf1HFUAlxDs7d+znx4LYCZp9hhi35da4cNjB58lW3tdwgIewHqjk4a4TsfXcdvHPeq7X6Xva8desesLLs7V91bgt+mfSUADDy+H+FIu5jzMOpNHCmM/Rw7nDaTs2rjBC6V3Vx/idsaP1O4K2jj+R7zZiczq6Nx2ne05cuWnN2dpbb97bl5e37OrtLV1mO5rz8/Z91nbLU2JjnvNGtFSvO3TzpM63Wgur8000YP1/f6rYfSd03+UONnhPzTSQ47+H708V1wrpRiIiAiIgIiICIiAiIgIiIN16CdOpLG4MkJdCd5OS70uq9IrTGJInBzSAcjmK715WV10b6TT2J4dE44drdhQenEWmdFPSFZ7WA156uXaDkFuTTXMaII9rsMcvrsBpodCOIcMweSi/IJWeynNPdlGMfmqHeZVmiCuFotDfWha7ix/6OA+K4vvF1DWzzD8h+DlZrhLoeSCnuu3ubDGBDK6jRmMNDlqKuUk2uc+rABxe8DyaCslyf6eL7jfgpyCt+STv9pMGjdE2n/N1T4ALPZLujjNWt7R1c6rnnm45qWiAuEkYcC1wqCKEHaFyWs9J+m1msbTVwdJnRrc80FyBDZYtQxg1JOZPEnMldO+kD0hutBMNmJbFtcDryIWvdK+mc9tccTi2PY0frRa0g+kr4iICIiAiIgIiICIiAiIgIiICIiD600zGRW2dHvSBa7LQYsbNzlqSIO87l9K1lkoJgY3eX771uNiv6zSisczD30+K8trJFO5vquc3kSPgg9YNeDoQV8l0PJeYbN0jtcfqzyDvr8VYx9PLeP57jzJ/ug9BXJ/p4vuN+CmlwGq84Hp5bqUExaBoG1AHLNQbT0ntcnrWiTxQekLXfEEQq+Vg76+QWpXz6UbHFURkyO4VouiprS9/rvc7mSfisKDdukPpKtVoq1hEbDsGv78VpkshcS5xJJ1J1XBEBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQf/Z"],
    },
];

    return (
      <div className="relative flex flex-wrap items-center justify-center p-4 gap-16">
      {projects.map((item, idx) => (
        <div
          className="lg:min-h-[32.5rem] h-[25rem] flex items-center justify-center sm:w-96 w-[80vw] mt-20"
          key={item.id}
        >
          <PinContainer
            title={item.title}
            href={item.href}
          >
            <div className="relative flex items-center justify-center sm:w-96 w-[80vw] overflow-hidden h-[20vh] lg:h-[30vh] mb-10">
              <div
                className="relative w-full h-full overflow-hidden lg:rounded-3xl"
                style={{ backgroundColor: "#13162D" }}
              >
                <div className="flex flex-1 w-full h-full rounded-lg bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500" />
              </div>
              <img
                src={item.img}
                alt="cover"
                className={`z-10 absolute ${idx === 1 || idx == 2 ? "scale-150" : ""}`}
                style={{
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%) rotate(10deg)', // Adjust rotation angle as needed
                  width: '60%', // Adjust size as needed
                  height: 'auto', // Maintain aspect ratio
                }}
              />
            </div>


            <h1 className="font-bold text-slate-100 lg:text-2xl md:text-xl text-base">
              {item.cardTitle}
            </h1>

            <p
              className="mt-4"
            >
              {item.cardDescription}
            </p>

            <div className="flex items-center justify-between mt-7 mb-3">
              <div className="flex items-center">
                {item.iconLists.map((icon, index) => (
                  <div
                    key={index}
                    className="border border-white/[.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
                    style={{
                      transform: `translateX(-${5 * index + 2}px)`,
                    }}
                  >
                    <img src={icon} alt="icon5" className="p-2" />
                  </div>
                ))}
              </div>

              <div className="flex justify-center items-center">
                {/* <p className="flex lg:text-xl md:text-xs text-sm text-purple">
                  Check Live Site
                </p>
                <FaLocationArrow className="ms-3" color="#CBACF9" /> */}
              </div>
            </div>
          </PinContainer>
        </div>
         ))}
      </div>
    );
}