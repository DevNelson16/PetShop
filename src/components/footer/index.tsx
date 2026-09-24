
import { Link } from 'react-router-dom'

import {
  FiGithub,
  FiLinkedin,
  FiInstagram,
} from 'react-icons/fi'

export function Footer() {
  return (
    <footer className="w-full bg-slate-900 text-white">
      <div className="w-full max-w-7xl mx-auto px-5 py-10">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Perfil */}
          <div>
            <h2 className="font-bold text-xl mb-3">
              Nelson Geovetty Jaime
            </h2>

            <p className="text-slate-300 text-sm leading-6">
              Desenvolvedor Web Júnior, apaixonado por tecnologia,
              programação e desenvolvimento de aplicações web.
            </p>
          </div>

          {/* Navegação */}
          <div>
            <h3 className="font-semibold text-lg mb-3">
              Navegação
            </h3>

            <div className="flex flex-col gap-2 text-slate-300 text-sm">

              <Link
                to="/"
                className="hover:text-white transition"
              >
                Início
              </Link>

              <Link
                to="/cart"
                className="hover:text-white transition"
              >
                Carrinho
              </Link>

            </div>
          </div>

          {/* Redes sociais */}
          <div>
            <h3 className="font-semibold text-lg mb-3">
              Redes sociais
            </h3>

            <div className="flex items-center gap-4">

              <a
                href="https://github.com/DevNelson16"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-white transition"
              >
                <FiGithub size={22} />
              </a>

              <a
                href="https://www.linkedin.com/in/nelson-geovetty-jaime/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-white transition"
              >
                <FiLinkedin size={22} />
              </a>

              <a
                href="https://www.instagram.com/devngj_16/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-white transition"
              >
                <FiInstagram size={22} />
              </a>

            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-slate-700 mt-8 pt-5 text-center">

          <p className="text-slate-400 text-sm">
            © 2026 Nelson Geovetty Jaime. Todos os direitos reservados.
          </p>

        </div>

      </div>
    </footer>
  )
}
