const inquirer = require('inquirer');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

async function generateMigration() {
  try {
    // Ask for the migration name
    const answer = await inquirer.prompt([
      {
        type: 'input',
        name: 'migrationName',
        message: 'What is the name of the migration?',
        validate: (input: string) => {
          if (!input.trim()) {
            return 'Migration name cannot be empty';
          }
          if (input.includes(' ')) {
            return 'Migration name cannot contain spaces';
          }
          return true;
        },
      },
    ]);

    const command = `npx ts-node -P ./libs/epona-db/tsconfig.lib.json -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:generate -d ./libs/epona-db/src/lib/datasource.ts ./libs/epona-db/src/lib/typeorm-migrations/${answer.migrationName}`;

    console.log('Generating migration...');
    
    const { stdout, stderr } = await execAsync(command);
    
    if (stderr) {
      console.error('Error:', stderr);
      return;
    }
    
    console.log('Migration generated successfully!');
    console.log(stdout);

  } catch (error) {
    console.error('Failed to generate migration:', error);
    process.exit(1);
  }
}

// Run the migration generator
generateMigration();
