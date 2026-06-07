import { Mail, Megaphone, Handshake, Sparkles } from "lucide-react";
import SectionGlow from "../components/layout/SectionGlow";

function ContactCard({ icon: Icon, title, description }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur">
      <div className="mb-4 inline-flex rounded-2xl border border-violet-400/20 bg-violet-500/10 p-3 text-violet-200">
        <Icon size={20} />
      </div>

      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-zinc-400">{description}</p>
    </div>
  );
}

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16 space-y-14">
      <section className="text-center">
        <p className="text-sm uppercase tracking-[0.25em] text-violet-400">
          Contact FlowTerp
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-5xl">
          Let’s Build Something
          <span className="block text-violet-400">Powerful Together</span>
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-zinc-400 md:text-lg">
          Whether you are interested in advertising, collaborations,
          partnerships, or product opportunities, we’d love to hear from you.
          FlowTerp is built for growth, experimentation, and creative
          performance — and we’re open to working with aligned brands and teams.
        </p>
      </section>

      <SectionGlow glow="violet" className="rounded-[2rem]">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-8 backdrop-blur">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.2em] text-violet-300">
              Opportunities
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-white md:text-3xl">
              Ways we can work together
            </h2>
            <p className="mt-4 text-zinc-400 leading-7">
              FlowTerp is open to brand partnerships, creative collaborations,
              promotional opportunities, and strategic conversations around the
              future of AI-guided recommendation systems.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            <ContactCard
              icon={Megaphone}
              title="Advertising"
              description="Interested in promoting products, services, or campaigns to a creative and performance-minded audience? Reach out to discuss advertising opportunities."
            />

            <ContactCard
              icon={Handshake}
              title="Collaborations"
              description="We’re open to collaborations with creators, media brands, cannabis-adjacent companies, and innovative product teams looking to build something unique."
            />

            <ContactCard
              icon={Sparkles}
              title="Partnerships"
              description="Have an idea for a deeper partnership, platform integration, or sponsored feature? Let’s explore what a strong long-term fit could look like."
            />
          </div>
        </div>
      </SectionGlow>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <SectionGlow glow="blue" className="rounded-[2rem]">
          <div className="h-full rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-8 backdrop-blur">
            <p className="text-sm uppercase tracking-[0.2em] text-sky-300">
              Contact Details
            </p>

            <h2 className="mt-3 text-2xl font-semibold text-white">
              Reach us directly
            </h2>

            <p className="mt-4 text-zinc-400 leading-7">
              For business inquiries, collaborations, advertising, or general
              partnership opportunities, contact us by email.
            </p>

            <div className="mt-8 rounded-3xl border border-white/10 bg-black/20 p-5">
              <div className="flex items-start gap-4">
                <div className="inline-flex rounded-2xl border border-violet-400/20 bg-violet-500/10 p-3 text-violet-200">
                  <Mail size={20} />
                </div>

                <div className="min-w-0">
                  <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
                    Email
                  </p>
                  <a
                    href="mailto:flowterp@gmail.com"
                    className="mt-2 inline-block break-all text-lg font-semibold text-white transition hover:text-violet-300"
                  >
                    flowterp@gmail.com
                  </a>
                  <p className="mt-3 text-sm leading-6 text-zinc-400">
                    We typically respond within 24–48 hours.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </SectionGlow>

        <SectionGlow glow="emerald" className="rounded-[2rem]">
          <div className="h-full rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-8 backdrop-blur">
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-300">
              Best For
            </p>

            <h2 className="mt-3 text-2xl font-semibold text-white">
              Reach out if you want to
            </h2>

            <div className="mt-6 space-y-4 text-zinc-400">
              <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4 leading-6">
                Advertise to a creative, performance-focused audience
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4 leading-6">
                Collaborate on branded content, tools, or campaigns
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4 leading-6">
                Explore strategic partnerships or product opportunities
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4 leading-6">
                Connect around the future of AI-guided recommendation systems
              </div>
            </div>
          </div>
        </SectionGlow>
      </div>
    </main>
  );
}