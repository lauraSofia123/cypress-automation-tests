describe('Ejercicios sugeridos en example.cypress.io', () => {
  it('Ejercicio 1 - Visitar pagina principal y validar Kitchen Sink y boton Type', () => {
    cy.visit('https://example.cypress.io')

    cy.contains('Kitchen Sink').should('be.visible')
    cy.contains('type').should('exist')
    cy.screenshot('ejercicio-1-kitchen-sink')
  })

  it('Ejercicio 2 - Ingresar a Type, escribir nombre y validar texto', () => {
    cy.visit('https://example.cypress.io')

    cy.contains('type').click()

    cy.url().should('include', '/commands/actions')

    cy.get('#email1')
      .clear()
      .type('Laura')
      .should('have.value', 'Laura')
    cy.screenshot('ejercicio-2-type-nombre')
  })

  it('Ejercicio 3 - Ir a Checkboxes, seleccionar los disponibles y validar marcados', () => {
    cy.visit('https://example.cypress.io/commands/actions')

    cy.get('.action-checkboxes [type="checkbox"]')
      .not('[disabled]')
      .check()
      .should('be.checked')

    cy.get('.action-checkboxes [type="checkbox"][disabled]')
      .should('be.disabled')
    cy.screenshot('ejercicio-3-checkboxes')
  })

  it('Ejercicio 4 - Llenar formulario y enviarlo', () => {
    cy.visit('https://example.cypress.io/commands/actions')

    cy.get('#email1')
      .clear()
      .type('laura@test.com')
      .should('have.value', 'laura@test.com')

    cy.get('#password1')
      .clear()
      .type('123456')
      .should('have.value', '123456')

    cy.get('.action-form').submit()
    cy.screenshot('ejercicio-4-formulario')
  })
  it('Ejercicio 5 - Login simulado, navegacion y cierre de sesion', () => {
    cy.visit('https://example.cypress.io')

    cy.window().then((win) => {
      win.history.replaceState({}, '', '#/inicio')

      win.document.body.innerHTML = `
        <main>
          <h1>Pagina inicial</h1>

          <form id="login-form">
            <input id="usuario" placeholder="Usuario">
            <input id="password" type="password" placeholder="Contrasena">
            <button type="submit">Iniciar sesion</button>
          </form>

          <section id="dashboard" style="display: none;">
            <h1>Bienvenida Laura</h1>
            <button id="ir-perfil">Ir al perfil</button>
          </section>

          <section id="perfil" style="display: none;">
            <h1>Perfil de usuario</h1>
            <button id="logout">Cerrar sesion</button>
          </section>
        </main>
      `

      const loginForm = win.document.querySelector('#login-form')
      const dashboard = win.document.querySelector('#dashboard')
      const perfil = win.document.querySelector('#perfil')

      loginForm.addEventListener('submit', (event) => {
        event.preventDefault()
        loginForm.style.display = 'none'
        dashboard.style.display = 'block'
        perfil.style.display = 'none'
        win.history.pushState({}, '', '#/dashboard')
      })

      win.document.querySelector('#ir-perfil').addEventListener('click', () => {
        dashboard.style.display = 'none'
        perfil.style.display = 'block'
        win.history.pushState({}, '', '#/perfil')
      })

      win.document.querySelector('#logout').addEventListener('click', () => {
        perfil.style.display = 'none'
        dashboard.style.display = 'none'
        loginForm.style.display = 'block'
        win.history.pushState({}, '', '#/inicio')
      })
    })

    cy.get('#usuario').type('Laura')
    cy.get('#password').type('123456')
    cy.contains('Iniciar sesion').click()

    cy.contains('Bienvenida Laura').should('be.visible')
    cy.url().should('include', '#/dashboard')

    cy.contains('Ir al perfil').click()
    cy.contains('Perfil de usuario').should('be.visible')
    cy.url().should('include', '#/perfil')

    cy.contains('Cerrar sesion').click()
    cy.contains('Pagina inicial').should('be.visible')
    cy.url().should('include', '#/inicio')
    cy.screenshot('ejercicio-5-login-simulado')
  })
})