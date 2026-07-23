import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { HeroSection } from "@/components/HeroSection";
import { AnimatedSection } from "@/components/AnimatedSection";
import { DimensionCard } from "@/components/DimensionCard";
import { JoinForm } from "@/components/JoinForm";
import {
  dimensiones,
  ideario,
  planMeta,
  presentacion,
  rendicionCuentas,
  vision,
} from "@/lib/plan-data";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-[#FAFAFA]">
        <HeroSection />

        <AnimatedSection id="presentacion" title="Presentación" subtitle={presentacion}>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h3 className="font-heading text-2xl text-[#D72638]">Nuestro compromiso</h3>
              <p className="mt-4 leading-relaxed text-neutral-700">
                Este Plan de Gobierno ha sido elaborado considerando las necesidades reales de
                la población y respetando las competencias de la Municipalidad Distrital de
                Pueblo Nuevo.
              </p>
            </div>
            <div className="rounded-3xl bg-[#D72638] p-6 text-white shadow-lg">
              <h3 className="font-heading text-2xl">Visión 2030</h3>
              <p className="mt-4 leading-relaxed text-white/90">{vision}</p>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection
          id="ideario"
          title="Ideario"
          subtitle="Principios y valores que guían nuestra gestión municipal."
          className="bg-white"
        >
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="font-heading text-xl text-[#D72638]">Principios</h3>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {ideario.principios.map((item) => (
                  <li
                    key={item}
                    className="rounded-2xl border border-neutral-200 bg-[#FAFAFA] px-4 py-3 text-sm text-neutral-700"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-heading text-xl text-[#D72638]">Valores</h3>
              <ul className="mt-4 flex flex-wrap gap-3">
                {ideario.valores.map((item) => (
                  <li
                    key={item}
                    className="rounded-full bg-[#D72638] px-4 py-2 text-sm font-medium text-white"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection
          id="propuestas"
          title="Propuestas por dimensiones"
          subtitle="Un plan integral para transformar Pueblo Nuevo en los próximos años."
        >
          <div className="space-y-8">
            {dimensiones.map((dimension, index) => (
              <DimensionCard key={dimension.id} dimension={dimension} index={index} />
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection
          title="Rendición de cuentas"
          subtitle="La gestión municipal implementará mecanismos permanentes de transparencia."
          className="bg-white"
        >
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rendicionCuentas.map((item) => (
              <li
                key={item}
                className="rounded-2xl border border-neutral-200 bg-[#FAFAFA] p-5 text-neutral-700"
              >
                {item}
              </li>
            ))}
          </ul>
        </AnimatedSection>

        <AnimatedSection
          id="manada"
          title="Únete a la manada"
          subtitle="Súmate al movimiento ciudadano. Déjanos tus datos y nos pondremos en contacto contigo."
          className="bg-gradient-to-b from-[#FAFAFA] to-white"
        >
          <div className="grid items-start gap-8 lg:grid-cols-[1fr_1.1fr]">
            <div className="rounded-3xl bg-[#D72638] p-8 text-white shadow-xl">
              <p className="text-sm uppercase tracking-[0.2em] text-white/70">Participación</p>
              <h3 className="mt-3 font-heading text-3xl">Juntos construimos Pueblo Nuevo</h3>
              <p className="mt-4 leading-relaxed text-white/90">
                Tu voz importa. Al unirte a la manada formas parte de una comunidad comprometida
                con la seguridad, el desarrollo y la transparencia en nuestro distrito.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-white/90">
                <li>• Recibe novedades del plan de gobierno</li>
                <li>• Participa en actividades ciudadanas</li>
                <li>• Apoya las propuestas de tu comunidad</li>
              </ul>
            </div>
            <JoinForm />
          </div>
        </AnimatedSection>
      </main>

      <footer className="border-t border-neutral-200 bg-white py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-center sm:flex-row sm:px-6 sm:text-left lg:px-8">
          <p className="text-sm text-neutral-600">
            © {new Date().getFullYear()} {planMeta.subtitle} · {planMeta.period}
          </p>
          <Link href="/admin" className="text-sm font-medium text-[#D72638] hover:underline">
            Acceso administradores
          </Link>
        </div>
      </footer>
    </>
  );
}
