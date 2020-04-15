export const config = {
  "dev": {
    "username": process.env.POSTGRES_USERNAME,
    "password": process.env.POSTGRES_PASSWORD,
    "database": process.env.POSTGRES_DATABASE,
    "host": process.env.POSTGRES_HOST,
    "dialect": process.env.UDACITY_DIALECT,
    "aws_region": process.env.UDACITY_AWS_REGION,
    "aws_profile": process.env.UDACITY_AWS_PROFILE,
    "aws_media_bucket": process.env.UDACITY_AWS_MEDIA_BUCKET
  },
  "prod": {
    "username": "",
    "password": "",
    "database": "udagram_prod",
    "host": "",
    "dialect": "postgres"
  }
}
