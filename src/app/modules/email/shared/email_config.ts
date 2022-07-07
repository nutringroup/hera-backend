

export function tokenAccessLogin(codigo: string) {
	return `<!DOCTYPE html>
	<html lang="pt-br">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Convite para o Mynd</title>
        <style>
          *,
          *::before,
          *::after {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          }
          .main-container {
            position: relative;
            width: 100%;
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
          .header {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            background-color: #6d75c8;
            height: 18%;
            padding: 0 1rem;
          }
          .logo-mynd {
            width: 100px;
            margin: 0 0 0.8rem;
          }
          .header .title {
            font-size: 1.5rem;
            color: #fff;
            font-weight: 600;
          }
          .emphasis-text {
            color: #6d75c8;
            font-weight: bold;
          }
          .content {
            padding: 1rem;
          }
          .content h1 {
            color: #6d75c8;
            margin: 0 0 1rem;
          }
          .content p {
            margin: 0 0 0.5rem;
            color: #444;
          }
          .content .btn {
            font-weight: 500;
            font-size: 0.9rem;
            padding: 0.5rem 1rem;
            border: none;
            border-radius: 6px;
            margin: 1rem 0;
            cursor: pointer;
          }
          .content .btn-recover {
            background-color: #6d75c8;
            color: #fff;
          }
          .content .btn-cancel-recover {
            border: 1px solid #6d75c8;
            color: #6d75c8;
          }
          .content .thanks {
            margin: 0.5rem 0;
          }
          .footer {
            display: flex;
            flex-direction: column;
            justify-content: center;
            bottom: 0;
            padding: 1rem;
            height: 20%;
            background-color: #6d75c8;
            color: #fff;
          }
          .footer p {
            margin: 0 0 0.5rem;
          }
        </style>
      </head>
      <body>
        <main class="main-container">
        <h3 class="title">Token de acesso - Hera</h3>
          <div class="content">
            <p>
              Você solicitou o
              <span class="emphasis-text">acesso</span> para o
              <span class="emphasis-text">Hera</span>. Utilize o token abaixo
              para realizar o login.
            </p>
            <h3>Token: ${codigo}</h3>
          </div>
        </main>
      </body>
    </html>`;
}

export function recoveryPassword(codigo: string) {
	return `<!DOCTYPE html>
	<html lang="pt-br">
	  <head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Convite para o Mynd</title>
		<style>
		  *,
		  *::before,
		  *::after {
			margin: 0;
			padding: 0;
			box-sizing: border-box;
		  }
		  body {
			font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
		  }
		  .main-container {
			position: relative;
			width: 100%;
			height: 100vh;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
		  }
		  .header {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			justify-content: center;
			background-color: #6d75c8;
			height: 18%;
			padding: 0 1rem;
		  }
		  .logo-mynd {
			width: 100px;
			margin: 0 0 0.8rem;
		  }
		  .header .title {
			font-size: 1.5rem;
			color: #fff;
			font-weight: 600;
		  }
		  .emphasis-text {
			color: #6d75c8;
			font-weight: bold;
		  }
		  .content {
			padding: 1rem;
		  }
		  .content h1 {
			color: #6d75c8;
			margin: 0 0 1rem;
		  }
		  .content p {
			margin: 0 0 0.5rem;
			color: #444;
		  }
		  .content .btn {
			font-weight: 500;
			font-size: 0.9rem;
			padding: 0.5rem 1rem;
			border: none;
			border-radius: 6px;
			margin: 1rem 0;
			cursor: pointer;
		  }
		  .content .btn-recover {
			background-color: #6d75c8;
			color: #fff;
		  }
		  .content .btn-cancel-recover {
			border: 1px solid #6d75c8;
			color: #6d75c8;
		  }
		  .content .thanks {
			margin: 0.5rem 0;
		  }
		  .footer {
			display: flex;
			flex-direction: column;
			justify-content: center;
			bottom: 0;
			padding: 1rem;
			height: 20%;
			background-color: #6d75c8;
			color: #fff;
		  }
		  .footer p {
			margin: 0 0 0.5rem;
		  }
		</style>
	  </head>
	  <body>
		<main class="main-container">
		  <header class="header">
			<span class="title">Convite para o Mynd</span>
		  </header>
		  <div class="content">
			<p>
			  Você recebeu o 
			  <span class="emphasis-text">convite</span> para o acesso premium do
			  <span class="emphasis-text">Mynd App</span>. Utilize o botão abaixo
			  para realizar o cadastro.
			</p>
			<a href="https://mynd-app.vercel.app/user/token-guest-validate/${codigo}">
			  <button class="btn btn-recover">Cadastrar Conta</button>
			</a>
			<p class="thanks">
			  Um imenso obrigado da equipe <span class="emphasis-text">Mynd</span>.
			</p>
		  </div>
		  <footer class="footer">
			<div class="doubts">
			  <p>Alguma dúvida?</p>
			  <p>
				Entre em contato conosco pelo e-mail:
				<span class="email">suporte@myndapp.com.br</span>
			  </p>
			</div>
		  </footer>
		</main>
	  </body>
	</html>
	`;
}