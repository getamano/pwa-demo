### Hosting GitHub Pages

Deploying using angular-cli-ghpages
Inside the sample folder, add the angular-cli-ghpages package using the following command:

` ng add angular-cli-ghpages`

Now, we can proceed to deploy.

The deploy command is simple, and we must add a base-href argument with the name of the repository in it:

`ng deploy --base-href=/angular-app/`
