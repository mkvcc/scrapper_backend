import { INestApplication } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "../app.module";

const files = require('./files');

const Run = async function () {
  let seed_file;

  let file_keys = Object.keys(files);


  let cli_arg = process.argv[2];

  if (!cli_arg) {
    console.log('no seed name provided')
    process.exit()
  }

  for (let i = 0; i < file_keys.length; i++) {
    

    if (cli_arg === file_keys[i]) {
      seed_file = file_keys[i];
      break;
    }
  }

  if (!seed_file) {
    console.log('no seed file found')
    process.exit()
  }


  let SeedClass = files[seed_file].default;

  const app = await NestFactory.createApplicationContext(AppModule);

  let seed_object = new SeedClass(app);
  await seed_object.run();
};

try {
  Run().then(() => {
    console.log('finish');
  });
} catch (e) {
  console.log('error ', e);
}


