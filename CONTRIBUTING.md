# Contributing
So you want to contribute to ATLauncher? Well here are a few ways you can help make this project
better!

## Commit messages
Please use conventional commits when committing code. The best way to commit code is to use the
command `npm run commit+` after staging your files as it will walk you through the commit process
to ensure it's as accurate as possible.

## Branching structure
When contributing please follow our branching structure when making a PR. Not following this will
result in automatic closure of the PR.

Our branching structure is based on
[Gitflow Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow).

 - **master** will always contain the code for the latest production release.
 - **develop** will contain the latest beta version used for testing.
 - **feature/** will contain single issues being developed. Once developed they're merged into
                develop and tagged with a beta release version. They should be named
                'feature/22-some-brief-description'.
 - **release/** will contain all the code from each feature branch that are going out in the next
                release and should all be merged into the branch. Once approved and tested it gets
                merged into master and tagged. They should be named 'release/4.1.1'.
 - **hotfix/** will contain hotfixes going to be merged directly into master then tagged. Hotfixes
               should only need to occur when there is a very critical bug in the current release
               that needs to be fixed ASAP. All hotfix branches should be branched off of master.

All tags are done on release of a beta or a production version and should be in format
**v(version number)** and the version number being that of a semver number.

All develop releases should be tagged with **beta** versions. For instance **v4.1.1-beta.1.6** where
the NPM package version would be **4.1.1-beta.1.6**. Alpha versions shouldn't be used.

Feature branches are deleted once in a release branch. Any issues that come up after the feature
branch has been merged into a release branch should be resolved by creating a new feature branch off
the release branch.

An example of a good name for a feature branch is say we have an issue (#44) which is about not
being able to delete a pack. A good name for a feature branch would be
`feature/44-unable-to-delete-packs` and go from there.

## Code styling
When you commit and create a PR, all code you've committed will be linted against our defined
eslint rules. You can check if your code follows our standards by running the `npm run lint`
command.

## Testing
All new code created should be properly tested with both unit and end to end tests where
appropriate.

Please don't over test your code, we don't aim for complete code coverage and don't even use that as
a metric, we simply want to make sure all code is tested for typical happy and sad paths, making
sure as many use cases are accounted for.

## Discord
If you wish to join our Discord channel please do so [here](https://atl.pw/discord). There is a
channel specifically for NEXT discussion called **#atlauncher-next** which you can feel free to
contribute to.
