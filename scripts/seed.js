import { db } from 'api/src/lib/db'

// Manually apply seeds via the `yarn rw prisma db seed` command.
//
// Seeds automatically run the first time you run the `yarn rw prisma migrate dev`
// command and every time you run the `yarn rw prisma migrate reset` command.
//
// See https://redwoodjs.com/docs/database-seeds for more info

const VALENTINES_CONTENT = `<p>Hey everyone!</p>
<p>From me and the team — we just wanted to wish you all a Happy Valentine's Day! ❤️</p>
<p>Whether you're spending today with someone special, friends, family, or just enjoying some well-deserved chill time — we hope it's a great one.</p>
<p>On the development side of things, we want to be transparent as always:<br>This week's progress has been a little slower than usual. Life sometimes has a way of demanding attention — but even with that, we're still putting in work every single day.</p>
<p>The project is moving forward. Step by step.<br>And nothing is going to stop us.</p>
<p>We're fully committed to bringing this to Early Access, and we're more motivated than ever to keep pushing.</p>
<p>Thank you for sticking with us and supporting the journey — it truly means a lot.</p>
<p>As always, thank you all for the support ❤️<br>— FIFI =)</p>`

const DEV_UPDATE_CONTENT = `<p>Hey everyone!<br>We've been very productive lately and wanted to share a bit of what's been happening behind the scenes.</p>
<p>Over the past stretch of development, we've been working heavily on:</p>
<p>✅ Expanding and refining the quest system</p>
<p>🎙️ Updates and improvements to proximity chat</p>
<p>🛒 New additions to the shop</p>
<p>🗺️ Slowly expanding the map and adding more detail as quests are introduced</p>
<p>A lot of this work has been tricky and interconnected — especially when systems depend on each other — but it's coming together really nicely. Every new addition is helping the world feel more alive and purposeful.</p>
<p>We've also done some small behind-the-scenes playtesting, making sure these systems feel good together and catching issues early. It's still early internal testing, but it's always exciting to see everything functioning in motion.</p>
<p>Progress hasn't just been about adding features — it's also been about making sure everything works smoothly together. And that part takes time, testing, and iteration.</p>
<p><strong>🛠️ Dev Note</strong><br>We also want to share something important.</p>
<p>One of our devs, Pathfinder, recently got injured and is currently resting (as he absolutely should). We've redistributed his workload for now so he can properly recover without worrying about development.</p>
<p>If you can, please send him some much, much love ❤️<br>Recovery comes first, always.</p>
<p>We're still pushing forward as a team, and the project continues to move ahead — but health always takes priority.</p>
<p>More progress updates soon.</p>
<p>As always, thank you all for the support ❤️<br>— FIFI =)</p>`

export default async () => {
  try {
    const valentinesDay = new Date('2026-02-14T12:00:00.000Z')
    const devUpdateDay = new Date('2026-03-03T12:00:00.000Z')

    // Valentine's update
    const existingValentine = await db.update.findFirst({
      where: { title: { contains: 'Valentine' } },
    })
    if (existingValentine) {
      await db.update.update({
        where: { id: existingValentine.id },
        data: {
          image: 'valentinesCarousel.png',
          createdAt: valentinesDay,
          updatedAt: valentinesDay,
        },
      })
      console.info("  Valentine's update already exists; set image and date to Feb 14, 2026.")
    } else {
      await db.update.create({
        data: {
          title: '❤️ Happy Valentine\'s Day!',
          version: null,
          content: VALENTINES_CONTENT,
          summary: 'A Valentine\'s Day message from the team — thank you for your support!',
          image: 'valentinesCarousel.png',
          isPublished: true,
          createdAt: valentinesDay,
          updatedAt: valentinesDay,
        },
      })
      console.info("  Seeded Valentine's Day update.")
    }

    // Development update (Quests, Proximity Chat & Map Expansion) – March 3, 2026
    const existingDevUpdate = await db.update.findFirst({
      where: { title: { contains: 'Quests, Proximity Chat' } },
    })
    if (existingDevUpdate) {
      await db.update.update({
        where: { id: existingDevUpdate.id },
        data: { image: 'UPDATECarusle1.png' },
      })
      console.info("  Dev update (Quests, Proximity Chat) already exists; set image.")
    } else {
      await db.update.create({
        data: {
          title: '🛠️ Development Update – Quests, Proximity Chat & Map Expansion',
          version: null,
          content: DEV_UPDATE_CONTENT,
          summary: 'Quest system, proximity chat, shop additions, and map expansion — plus a note about the team.',
          image: 'UPDATECarusle1.png',
          isPublished: true,
          createdAt: devUpdateDay,
          updatedAt: devUpdateDay,
        },
      })
      console.info("  Seeded Development Update (Quests, Proximity Chat & Map Expansion).")
    }

    console.info('\n  Seed complete.\n')
  } catch (error) {
    console.error(error)
  }
}
