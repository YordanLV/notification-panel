const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  await prisma.notification.createMany({
    data: [
      {
        type: "Platform update",
        message: "New features available in version 1.2.3",
        userId: "system",
        releaseNumber: "1.2.3",
      },
      {
        type: "Comment Tag",
        message: "John Doe tagged you in a comment",
        userId: "john_doe",
        userName: "John Doe",
      },
      {
        type: "Access granted",
        message: "Jane Smith shared a chat with you",
        userId: "jane_smith",
        userName: "Jane Smith",
      },
      {
        type: "Join workspace",
        message: "Alice Johnson joined your workspace",
        userId: "alice_johnson",
        userName: "Alice Johnson",
      },
    ],
  });

  console.log("Database seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
