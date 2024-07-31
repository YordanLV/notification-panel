const { execSync } = require("child_process");

function main() {
  const DATABASE_URL = process.env.DATABASE_URL;
  if (!DATABASE_URL) {
    console.error("DATABASE_URL environment variable is not set");
    process.exit(1);
  }

  console.log("Running migrations...");
  execSync(`npx prisma migrate deploy`, { stdio: "inherit" });

  console.log("Migrations completed successfully");
}

main();
