"use client";

import { useEffect, useState } from "react";
import type { SessionAccount } from "@/lib/ig-auth";

type StaticDashboardPayload = {
  css: string;
  html: string;
  script: string;
};

type StaticDashboardPageProps = {
  dashboard: StaticDashboardPayload | null;
  account: SessionAccount | null;
};

function LoginScreen({ onLogin }: { onLogin: (account: SessionAccount) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/ig/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Unable to log in.");

      onLogin(data.account);
      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to log in.");
    } finally {
      setLoading(false);
    }
  }

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
          width: min(520px, 100%);
          padding: 30px;
          border: 1px solid rgba(255,255,255,0.68);
          border-radius: 24px;
          background: linear-gradient(160deg, rgba(255,255,255,0.76), rgba(255,255,255,0.42));
          box-shadow: 0 24px 70px rgba(14, 29, 52, 0.14);
          backdrop-filter: blur(26px);
          -webkit-backdrop-filter: blur(26px);
        }
        .ig-login-kicker-wrap {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 0 16px;
          text-align: center;
        }
        .ig-login-kicker {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin: 0;
          padding: 8px 12px;
          border-radius: 999px;
          background: rgba(255,255,255,0.62);
          border: 1px solid rgba(14,29,52,0.08);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1.2px;
          line-height: 1;
          text-transform: uppercase;
        }
        .ig-login-dot {
          position: relative;
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #2f9f6b;
          box-shadow: 0 0 0 1px rgba(47,159,107,0.28), 0 0 14px rgba(47,159,107,0.52);
        }
        .ig-login-dot::before {
          content: "";
          position: absolute;
          inset: -5px;
          border-radius: inherit;
          background: rgba(47,159,107,0.34);
          animation: igLoginPing 1.45s cubic-bezier(0,0,0.2,1) infinite;
        }
        @keyframes igLoginPing { 75%, 100% { transform: scale(2.1); opacity: 0; } }
        .ig-login-title {
          margin: 0;
          text-align: center;
          font-family: "Newsreader", serif;
          font-size: clamp(40px, 6vw, 64px);
          line-height: .92;
          letter-spacing: -2.4px;
          font-style: italic;
          font-weight: 500;
        }
        .ig-login-copy { margin: 16px auto 24px; max-width: 390px; color: rgba(14,29,52,0.64); font-size: 14px; line-height: 1.6; font-weight: 600; text-align: center; }
        .ig-login-form { display: grid; gap: 12px; }
        .ig-login-form label { display: grid; gap: 7px; color: rgba(14,29,52,0.62); font-size: 11px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; }
        .ig-login-form input {
          width: 100%;
          min-height: 52px;
          border: 1px solid rgba(14,29,52,0.1);
          border-radius: 16px;
          background: rgba(255,255,255,0.72);
          padding: 0 15px;
          color: #0E1D34;
          font: inherit;
          outline: none;
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.36);
        }
        .ig-login-form button {
          min-height: 52px;
          margin-top: 6px;
          border: 0;
          border-radius: 16px;
          background: #0E1D34;
          color: white;
          font: inherit;
          font-size: 13px;
          font-weight: 900;
          letter-spacing: .5px;
          text-transform: uppercase;
          cursor: pointer;
          box-shadow: 0 18px 44px rgba(14,29,52,0.22);
        }
        .ig-login-error { margin: 2px 0 0; color: #8c2635; font-size: 13px; font-weight: 700; }
      `}</style>
      <section className="ig-login-card" aria-label="Injectors Guide dashboard login">
        <div className="ig-login-kicker-wrap">
          <div className="ig-login-kicker"><span className="ig-login-dot" /> Injectors Guide</div>
        </div>
        <h1 className="ig-login-title">Dashboard Login</h1>
        <p className="ig-login-copy">Sign in to access the Injectors Guide command center.</p>
        <form className="ig-login-form" onSubmit={submit}>
          <label>Email<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required /></label>
          <label>Password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required /></label>
          {error ? <p className="ig-login-error">{error}</p> : null}
          <button type="submit" disabled={loading}>{loading ? "Signing in…" : "Log in"}</button>
        </form>
      </section>
    </div>
  );
}

export function StaticDashboardPage({ dashboard, account }: StaticDashboardPageProps) {
  const [currentAccount, setCurrentAccount] = useState(account);

  useEffect(() => {
    setCurrentAccount(account);
  }, [account]);

  useEffect(() => {
    if (!currentAccount || !dashboard) return;

    document.body.dataset.role = currentAccount.role;
    window.localStorage.setItem("igAccount", currentAccount.slug);

    const profileCard = document.querySelector(".profile-card");
    const profileImage = profileCard?.querySelector(".profile-avatar img") as HTMLImageElement | null;
    const profileName = profileCard?.querySelector("strong");
    const profileTitle = profileCard?.querySelector("p");

    if (profileImage) {
      profileImage.src = currentAccount.imageUrl;
      profileImage.alt = currentAccount.name;
    }
    if (profileName) profileName.textContent = currentAccount.name;
    if (profileTitle) profileTitle.textContent = currentAccount.title;

    if (profileCard instanceof HTMLElement) {
      profileCard.style.paddingRight = "52px";
    }

    if (profileCard && !profileCard.querySelector(".profile-settings")) {
      const settingsWrap = document.createElement("div");
      settingsWrap.className = "profile-settings";
      settingsWrap.setAttribute(
        "style",
        "position:absolute;right:12px;top:50%;transform:translateY(-50%);z-index:5;"
      );

      const settingsButton = document.createElement("button");
      settingsButton.type = "button";
      settingsButton.setAttribute("aria-label", "Profile settings");
      settingsButton.innerHTML = "⚙";
      settingsButton.setAttribute(
        "style",
        "width:30px;height:30px;border:1px solid rgba(255,255,255,.14);border-radius:999px;background:rgba(255,255,255,.10);color:rgba(255,255,255,.78);display:grid;place-items:center;cursor:pointer;transition:.18s ease;font-size:14px;"
      );

      const menu = document.createElement("div");
      menu.setAttribute(
        "style",
        "display:none;position:absolute;right:0;bottom:38px;min-width:132px;padding:6px;border-radius:14px;background:rgba(255,255,255,.94);border:1px solid rgba(14,29,52,.08);box-shadow:0 18px 44px rgba(14,29,52,.18);"
      );

      const logoutButton = document.createElement("button");
      logoutButton.type = "button";
      logoutButton.textContent = "Log out";
      logoutButton.setAttribute(
        "style",
        "width:100%;border:0;border-radius:10px;background:transparent;color:#0E1D34;padding:9px 10px;text-align:left;font:inherit;font-size:12px;font-weight:800;cursor:pointer;"
      );

      settingsButton.addEventListener("mouseenter", () => {
        settingsButton.style.background = "rgba(255,255,255,.20)";
        settingsButton.style.color = "#fff";
      });
      settingsButton.addEventListener("mouseleave", () => {
        settingsButton.style.background = "rgba(255,255,255,.10)";
        settingsButton.style.color = "rgba(255,255,255,.78)";
      });
      settingsButton.addEventListener("click", (event) => {
        event.stopPropagation();
        menu.style.display = menu.style.display === "none" ? "block" : "none";
      });
      logoutButton.addEventListener("click", async () => {
        await fetch("/api/ig/auth/logout", { method: "POST" });
        window.localStorage.removeItem("igAccount");
        window.localStorage.removeItem("igViewAccount");
        setCurrentAccount(null);
        window.location.href = "/dashboard";
      });

      menu.appendChild(logoutButton);
      settingsWrap.appendChild(menu);
      settingsWrap.appendChild(settingsButton);
      profileCard.appendChild(settingsWrap);
    }

    if (!dashboard.script.trim()) return;
    const runDashboardScript = new Function(dashboard.script);
    runDashboardScript();
  }, [currentAccount, dashboard]);

  if (!currentAccount || !dashboard) {
    return <LoginScreen onLogin={setCurrentAccount} />;
  }

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Newsreader:ital,opsz,wght@0,6..72,400..800;1,6..72,400..800&display=swap"
        rel="stylesheet"
      />
      <style dangerouslySetInnerHTML={{ __html: dashboard.css }} />
      <div dangerouslySetInnerHTML={{ __html: dashboard.html }} />
    </>
  );
}
