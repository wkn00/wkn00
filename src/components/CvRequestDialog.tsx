import { useState } from "react";
import { CheckCircle2, FileText, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type State =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent"; email: string }
  | { kind: "error"; message: string };

/* The CV is never served as a public file: the visitor gives an email,
   the cv-mailer sidecar (behind /api/) rejects disposable or undeliverable
   addresses, and mails the PDF to the ones that pass. */
const CvRequestDialog = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // honeypot, hidden from people
  const [state, setState] = useState<State>({ kind: "idle" });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState({ kind: "sending" });
    try {
      const res = await fetch("/api/cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) setState({ kind: "sent", email: email.trim() });
      else
        setState({
          kind: "error",
          message: data.message ?? "Something went wrong. Please try again later.",
        });
    } catch {
      setState({ kind: "error", message: "Couldn't reach the server. Please try again later." });
    }
  };

  const onOpenChange = (next: boolean) => {
    setOpen(next);
    // Start fresh next time, but keep a typed address after a failed attempt
    if (!next && state.kind === "sent") {
      setEmail("");
      setState({ kind: "idle" });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg" className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Get my CV
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        {state.kind === "sent" ? (
          <div className="flex flex-col items-center gap-3 py-4 text-center">
            <CheckCircle2 className="h-10 w-10 text-primary" />
            <DialogTitle>Check your inbox</DialogTitle>
            <DialogDescription>
              My CV is on its way to <span className="font-medium text-foreground">{state.email}</span>.
              If it isn't there in a few minutes, look in your spam folder.
            </DialogDescription>
            <Button className="mt-2" autoFocus onClick={() => onOpenChange(false)}>
              Done
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Get my CV</DialogTitle>
              <DialogDescription>
                Enter your email and I'll send my CV there as a PDF. Temporary email
                addresses aren't accepted.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={submit} className="space-y-4" noValidate>
              <div className="space-y-2">
                <label htmlFor="cv-email" className="text-sm font-medium">
                  Your email
                </label>
                <Input
                  id="cv-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (state.kind === "error") setState({ kind: "idle" });
                  }}
                  aria-invalid={state.kind === "error"}
                  aria-describedby={state.kind === "error" ? "cv-email-error" : undefined}
                  required
                  autoFocus
                />
                {state.kind === "error" && (
                  <p id="cv-email-error" role="alert" className="text-sm text-red-400">
                    {state.message}
                  </p>
                )}
              </div>

              {/* Honeypot: off-screen and skipped by keyboard and screen readers */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <label htmlFor="cv-website">Website</label>
                <input
                  id="cv-website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>

              <Button
                type="submit"
                className="w-full gap-2"
                disabled={state.kind === "sending" || !email.trim()}
              >
                {state.kind === "sending" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Sending
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" /> Send my CV
                  </>
                )}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CvRequestDialog;
