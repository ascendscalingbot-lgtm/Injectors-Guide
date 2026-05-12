"use client";

import { useEffect, useState } from "react";

type StaticDashboardPageProps = {
  css: string;
  html: string;
  script: string;
};

type AccountSlug = "traci-andreason" | "shayan-samimi";

type AccountProfile = {
  name: string;
  title: string;
  imageUrl: string;
};

const accountProfiles: Record<AccountSlug, AccountProfile> = {
  "traci-andreason": {
    name: "Traci Andreason",
    title: "Founder and CEO",
    imageUrl: "/traci-jason.png"
  },
  "shayan-samimi": {
    name: "Shayan Samimi",
    title: "Growth Partner",
    imageUrl: "/shayan-samimi.jpg"
  }
};

function getStoredAccount(): AccountSlug | null {
  if (typeof window === "undefined") return null;

  const stored = window.localStorage.getItem("igAccount");
  return stored === "traci-andreason" || stored === "shayan-samimi" ? stored : null;
}

function LoginScreen({ onLogin }: { onLogin: (account: AccountSlug) => void }) {
  return (
    <div className="ig-login-screen">
      <style>{`
        .ig-login-screen {
          min-height: 100vh;
          display: grid;
          place-items: center;
          padding: 24px;
          color: #0E1D34;
          font-family: "Inter", sans-serif;
          background:
            radial-gradient(circle at 16% 14%, rgba(45, 110, 247, 0.34), transparent 34%),
            radial-gradient(circle at 78% 0%, rgba(185, 232, 255, 0.54), transparent 30%),
            radial-gradient(circle at 86% 76%, rgba(45, 110, 247, 0.18), transparent 35%),
            linear-gradient(135deg, #eef7ff 0%, #EEECE7 44%, #eaf4ff 100%);
          position: relative;
          overflow: hidden;
        }
        .ig-login-screen::before {
          content: "";
          position: fixed;
          inset: 0;
          pointer-events: none;
          background-image:
            linear-gradient(rgba(14, 29, 52, 0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(14, 29, 52, 0.035) 1px, transparent 1px);
          background-size: 64px 64px;
          mask-image: radial-gradient(circle at 50% 20%, black, transparent 72%);
        }
        .ig-login-card {
          position: relative;
          z-index: 1;
          width: min(920px, 100%);
          padding: 28px;
          border: 1px solid rgba(255,255,255,0.68);
          border-radius: 24px;
          background: linear-gradient(160deg, rgba(255,255,255,0.76), rgba(255,255,255,0.42));
          box-shadow: 0 24px 70px rgba(14, 29, 52, 0.14);
          backdrop-filter: blur(26px);
          -webkit-backdrop-filter: blur(26px);
        }
        .ig-login-kicker {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 16px;
          padding: 8px 12px;
          border-radius: 999px;
          background: rgba(255,255,255,0.62);
          border: 1px solid rgba(14,29,52,0.08);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1.2px;
          text-transform: uppercase;
        }
        .ig-login-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #2f9f6b;
          box-shadow: 0 0 0 7px rgba(47,159,107,0.12);
        }
        .ig-login-title {
          margin: 0;
          font-family: "Newsreader", serif;
          font-size: clamp(42px, 6vw, 74px);
          line-height: .92;
          letter-spacing: -2.8px;
          font-style: italic;
          font-weight: 500;
        }
        .ig-login-copy {
          max-width: 640px;
          margin: 16px 0 28px;
          color: rgba(14,29,52,0.64);
          font-size: 15px;
          line-height: 1.6;
          font-weight: 600;
        }
        .ig-login-options {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
        }
        .ig-login-option {
          display: flex;
          align-items: center;
          gap: 14px;
          width: 100%;
          min-height: 116px;
          padding: 16px;
          border: 1px solid rgba(255,255,255,0.72);
          border-radius: 18px;
          background: rgba(255,255,255,0.58);
          color: #0E1D34;
          text-align: left;
          font: inherit;
          cursor: pointer;
          box-shadow: 0 16px 42px rgba(14,29,52,0.08);
          transition: transform .22s ease, box-shadow .22s ease, background .22s ease;
        }
        .ig-login-option:hover {
          transform: translateY(-3px);
          background: rgba(255,255,255,0.78);
          box-shadow: 0 24px 60px rgba(14,29,52,0.13);
        }
        .ig-login-avatar {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          object-fit: cover;
          flex: 0 0 64px;
          box-shadow: 0 14px 32px rgba(14,29,52,0.16);
        }
        .ig-login-option strong {
          display: block;
          font-size: 18px;
          line-height: 1.1;
        }
        .ig-login-option span {
          display: block;
          margin-top: 6px;
          color: rgba(14,29,52,0.58);
          font-size: 12px;
          font-weight: 800;
          letter-spacing: .7px;
          text-transform: uppercase;
        }
        @media (max-width: 720px) {
          .ig-login-options { grid-template-columns: 1fr; }
          .ig-login-card { padding: 20px; }
        }
      `}</style>
      <section className="ig-login-card" aria-label="Injectors Guide dashboard login">
        <div className="ig-login-kicker"><span className="ig-login-dot" /> Secure dashboard access</div>
        <h1 className="ig-login-title">Injectors Guide Command Center</h1>
        <p className="ig-login-copy">
          Choose your profile to open the dashboard. Traci gets a clean client view; Shayan gets operator controls for adding PR, approvals, and growth actions.
        </p>
        <div className="ig-login-options">
          <button className="ig-login-option" type="button" onClick={() => onLogin("traci-andreason")}>
            <img className="ig-login-avatar" src="/traci-jason.png" alt="Traci Andreason" />
            <div><strong>Traci Andreason</strong><span>Founder and CEO</span></div>
          </button>
          <button className="ig-login-option" type="button" onClick={() => onLogin("shayan-samimi")}>
            <img className="ig-login-avatar" src="/shayan-samimi.jpg" alt="Shayan Samimi" />
            <div><strong>Shayan Samimi</strong><span>Growth Partner</span></div>
          </button>
        </div>
      </section>
    </div>
  );
}

export function StaticDashboardPage({ css, html, script }: StaticDashboardPageProps) {
  const [account, setAccount] = useState<AccountSlug | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setAccount(getStoredAccount());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!account) return;

    const profile = accountProfiles[account];
    const profileCard = document.querySelector(".profile-card");
    const profileImage = profileCard?.querySelector(".profile-avatar img") as HTMLImageElement | null;
    const profileName = profileCard?.querySelector("strong");
    const profileTitle = profileCard?.querySelector("p");

    if (profileImage) {
      profileImage.src = profile.imageUrl;
      profileImage.alt = profile.name;
    }
    if (profileName) profileName.textContent = profile.name;
    if (profileTitle) profileTitle.textContent = profile.title;

    if (profileCard && !profileCard.querySelector(".profile-switch")) {
      const switchButton = document.createElement("button");
      switchButton.type = "button";
      switchButton.className = "profile-switch";
      switchButton.textContent = "Switch profile";
      switchButton.setAttribute(
        "style",
        "position:absolute;right:12px;bottom:10px;border:0;background:rgba(255,255,255,.14);color:rgba(255,255,255,.74);border-radius:999px;padding:4px 8px;font:inherit;font-size:9px;font-weight:800;letter-spacing:.6px;text-transform:uppercase;cursor:pointer;"
      );
      switchButton.addEventListener("click", () => {
        window.localStorage.removeItem("igAccount");
        setAccount(null);
      });
      profileCard.appendChild(switchButton);
    }

    if (!script.trim()) return;
    const runDashboardScript = new Function(script);
    runDashboardScript();
  }, [account, script, html]);

  function login(nextAccount: AccountSlug) {
    window.localStorage.setItem("igAccount", nextAccount);
    setAccount(nextAccount);
  }

  if (!ready) return null;

  if (!account) {
    return <LoginScreen onLogin={login} />;
  }

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Newsreader:ital,opsz,wght@0,6..72,400..800;1,6..72,400..800&display=swap"
        rel="stylesheet"
      />
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}
