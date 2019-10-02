const path = require('path')
const fs = require('fs-extra')
const matter = require('gray-matter')
const inquirer = require('inquirer')

const CONTENTS_DIR = '/content/blog'
const TARGET_DIR = path.join(process.cwd(), CONTENTS_DIR)
const SUB_CATEGORIY_LIST = ['algorithm'] // this category has sub category

const findCategories = () => {
  return fs.readdirSync(TARGET_DIR)
    .reduce((array, c) => {
      if (~SUB_CATEGORIY_LIST.indexOf(c)) {
        fs.readdirSync(path.join(TARGET_DIR, c))
          .forEach(subCat => array.push(`${c}/${subCat}`))
      } else {
        array.push(c);
      }
      return array;
    }, []);
}

const getCategories = async () => {
  let category
  const customCategoryOption = '[[ CREATE NEW CATEGORY ]]'
  const categories = findCategories();

  const categoryChoices = [
    ...categories,
    new inquirer.Separator(),
    customCategoryOption,
  ]

  const { selectedCategory } = await inquirer.prompt([
    {
      type: 'list',
      name: 'selectedCategory',
      message: 'Select a category',
      choices: categoryChoices,
    },
  ])

  if (selectedCategory === customCategoryOption) {
    const { customizedCategory } = await inquirer.prompt([
      {
        type: 'input',
        name: 'customizedCategory',
        message: 'Enter the customized category',
      },
    ])
    category = customizedCategory
  } else {
    category = selectedCategory
  }

  if (!category) {
    throw Error('Unknown Error: Cannot find category!')
  }


  return category
}

const makeSlug = title =>
  title
    .split(' ')
    .join('-')
    .toLowerCase()

const getTitle = async () => {
  const { title } = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter the title',
      default: () => 'New post title',
    },
  ])

  return title
}

const getType = async (a) => {
  const { type } = await inquirer.prompt([
    {
      type: 'list',
      name: 'type',
      message: 'Select the way to make file',
      choices: ['file', 'directory'],
    },
  ])

  return type;
}

const refineContents = rawContents =>
  matter
    .stringify('', rawContents)
    .split("'")
    .join('')

module.exports = (async function () {
  const date = new Date().toISOString();
  const category = await getCategories()

  const title = await getTitle()
  const contents = refineContents({ title, date, description: '', category })

  const type = await getType()

  const slug = makeSlug(title);
  const destDir = `${TARGET_DIR}/${category}${type === 'directory' ? `/${slug}` : ''}`
  const filePath = `${destDir}/${type === 'directory' ? 'index' : slug}.md`

  const destDirExists = await fs.pathExists(destDir)
  if (!destDirExists) {
    await fs.ensureDir(destDir)
  }

  fs.writeFile(filePath, contents, err => {
    if (err) {
      console.error('Unknown Error: Cannot write file!')
      return
    }

    console.log('\nSuccess to create new post!')
    console.log(`${filePath}\n${contents}`)
  })
})()
