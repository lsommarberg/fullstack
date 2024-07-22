const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http:localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'test',
        username: 'testuser',
        password: 'password'
      }
    })
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'second user',
        username: 'seconduser',
        password: 'password'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {

    const usernameField = await page.getByTestId("username")
    await expect(usernameField).toBeVisible()

    const passwordField = await page.getByTestId("password")
    await expect(passwordField).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {

      await loginWith(page, 'testuser', 'password')
      await expect(page.getByText('test logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {

      await loginWith(page, 'wronguser', 'password')
      await expect(page.getByText('invalid username or password')).toBeVisible()
    })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {

      await loginWith(page, 'testuser', 'password')

    })
  
    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'create' }).click()

      await createBlog(page, 'This is a test', 'Some author', 'example.com/example')
      await expect(page.getByText('a new blog This is a test Some author added')).toBeVisible()
      await expect(page.getByText('This is a test Some author view')).toBeVisible()

      })
    
    describe('Blog exists', () => {
      beforeEach(async ({ page }) => {
        await page.getByRole('button', { name: 'create' }).click()

        await createBlog(page, 'Blog1', 'Author1', 'example.com/example')

        })
      test('blog can be viewed', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()
        await expect(page.getByText('hide')).toBeVisible()
        })
      test('blog can be liked', async ({ page }) => {
          await page.getByRole('button', { name: 'view' }).click()
          await expect(page.getByText('hide')).toBeVisible()
          await page.getByRole('button', {name: 'like'}).click()
          await expect(page.getByText('1 likes')).toBeVisible()
          })
          
      test('blog can be deleted', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()
        
        page.on('dialog', dialog => dialog.accept())
        await page.getByRole('button', { name: 'delete' }).click()
    
        await expect(page.getByText('Blog1 Author1 view')).not.toBeVisible()
        
        })
      
      test('delete button is not shown for other user than the creator', async ({ page }) => {
          await page.getByRole('button', { name: 'Log out' }).click()
          await loginWith(page, 'seconduser', 'password')

          await page.getByRole('button', { name: 'view' }).click()
      
          await expect(page.getByText('Delete')).not.toBeVisible()
          
          })

      })
    })
  })
})

