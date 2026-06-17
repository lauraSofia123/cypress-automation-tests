describe('Actividad final del proyecto SIMA', () => {
    it('Debe iniciar sesion, registrar usuario, consultarlo y cerrar sesion', () => {
        const documentoNuevo = `1020${Date.now().toString().slice(-6)}`
        const nombreNuevo = 'Prueba'
        const apellidoNuevo = 'Cypress'
        const correoNuevo = `prueba${documentoNuevo}@misena.edu.co`
        const celularNuevo = '3001234567'

        cy.visit('http://localhost:5173/login')
        cy.screenshot('sima-1-login')

        cy.contains('Iniciar sesion').should('be.visible')

        cy.get('input').eq(0).clear().type('1000000001')
        cy.get('input').eq(1).clear().type('Admin123')
        cy.contains('button', 'Iniciar sesion').click()

        cy.contains('Bienvenido coordinador').should('be.visible')
        cy.contains('Admin Sistema').should('be.visible')
        cy.contains('Coordinador').should('be.visible')
        cy.screenshot('sima-2-dashboard-coordinador')

        cy.contains('Gestion de usuarios').click()
        cy.url().should('include', '/usuarios')
        cy.contains('Gestion de usuarios').should('be.visible')
        cy.contains('Usuarios registrados').should('be.visible')
        cy.screenshot('sima-3-gestion-usuarios')

        cy.contains('button', 'Crear usuario').click()
        cy.contains('Crear usuario').should('be.visible')

        cy.get('input[placeholder="Ej. Maria"]').type(nombreNuevo)
        cy.get('input[placeholder="Ej. Torres"]').type(apellidoNuevo)
        cy.get('select').eq(0).select('Cedula de ciudadania')
        cy.get('input[placeholder="Numero de cedula"]').type(documentoNuevo)
        cy.get('input[placeholder="usuario@misena.edu.co"]').type(correoNuevo)
        cy.get('input[placeholder="Numero de celular"]').type(celularNuevo)
        cy.get('select').eq(1).select('coordinador')

        cy.screenshot('sima-4-formulario-crear-usuario')

        cy.contains('button', 'Guardar usuario').click()

        cy.contains(nombreNuevo).should('be.visible')
        cy.contains(apellidoNuevo).should('be.visible')
        cy.contains('coordinador').should('be.visible')
        cy.screenshot('sima-5-usuario-registrado')

        cy.get('input[placeholder*="Buscar"]').clear().type(nombreNuevo)
        cy.contains(nombreNuevo).should('be.visible')
        cy.contains(apellidoNuevo).should('be.visible')
        cy.screenshot('sima-6-consulta-usuario-registrado')

        cy.contains('Admin Sistema').click()
        cy.contains(/cerrar sesion|salir/i).click()

        cy.url().should('include', '/login')
        cy.contains('Iniciar sesion').should('be.visible')
        cy.screenshot('sima-7-cierre-sesion')
    })
})