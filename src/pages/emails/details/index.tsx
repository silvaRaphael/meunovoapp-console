import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SectionHeader } from "../../../components/shared/section-header";
import { Page } from "../../../components/shared/page";
import { HandleRequest } from "../../../lib/handle-request";
import { useLanguage } from "../../../components/shared/language-provider";
import { Email } from "../data/email";
import { EmailSearch } from "../forms/search-form";
import { errorToast } from "components/shared/error-toast";

export function EmailDetails() {
  const { writeLang } = useLanguage();

  const { id } = useParams();
  const [email, setEmail] = useState<Email>();

  async function getEmail(id?: string) {
    const request = await new HandleRequest().get(`/emails/${id}`);

    request.onDone((response) => {
      setEmail(response as unknown as Email);
    });

    request.onError((error) => {
      errorToast(error);
    });
  }

  useEffect(() => {
    const controller = new AbortController();

    getEmail(id);

    return () => {
      controller.abort();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!email) return <></>;

  return (
    <Page
      pathname="/emails"
      header={
        <SectionHeader
          title={
            writeLang([
              ["en", "Emails"],
              ["pt", "E-mails"],
            ]) as string
          }
          pathname="/emails"
          tree={Array.isArray(email.to) ? email.to.map((to) => ({ label: to })) : [{ label: email.to }]}
        ></SectionHeader>
      }
    >
      <div className="space-y-6 pb-40">
        <EmailSearch email={email} />
      </div>
    </Page>
  );
}
