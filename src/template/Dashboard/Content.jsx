import iconGrayColor from "../../assets/icon-gray-color.svg";
import createHand from "../../assets/create-hand.svg";
import CollapsableSection from "./CollapsableSection.jsx";
import SideBar from "./SideBar.jsx";
import React, { useMemo, useContext, useState } from "react";
import ProjectModal from "../Project/ProjectModal.jsx";
import CollapsableEmptySection from "./CollapsableEmptySection.jsx";
import {
  TasksContext,
  TasksDispatchContext,
} from "../Providers/TasksContext.js";
import * as Toast from "@radix-ui/react-toast";
import {
  useUserUpdateRequest,
  useDynamicContext,
  useDynamicScopes,
} from "@dynamic-labs/sdk-react-core";

import { Link } from "react-router-dom";
import { Button, Modal } from "flowbite-react";

function Content() {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState("");
  const timerRef = React.useRef(0);
  const [openTOSModal, setOpenTOSModal] = useState(true);

  const tasks = useContext(TasksContext);
  const dispatch = useContext(TasksDispatchContext);
  const { updateUser } = useUserUpdateRequest();
  const user = useDynamicContext();
  const { userHasScopes } = useDynamicScopes();

  React.useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  const nextItemId = useMemo(
    () =>
      tasks
        ? tasks.length > 0
          ? Math.max(...tasks.map((task) => task.id)) + 1
          : 1
        : null,
    [tasks]
  );

  //todo: fix functionality for opening new item creation only when no items exits
  function openModal() {
    setIsOpen(true);
  }

  function editProject(id) {
    setOpen(false);
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setOpen(true);
      setToastMessage("Not currently available");
    }, 100);
  }

  function deleteProject(id) {
    setOpen(false);
    console.log("deleting project id" + id);
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setOpen(true);
      dispatch({
        type: "deleted",
        id: id,
        metadata: user.metadata,
        userUpdateFunction: updateUser,
      });
      setToastMessage("Project deleted");
    }, 100);
  }

  function shareProject(id) {
    setOpen(false);
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setOpen(true);
      setToastMessage("Not currently available");
    }, 100);
  }
  return (
    <>
      <Toast.Provider>
        <div className="w-full bg-neutral-100">
          <div className="container mx-auto py-10 flex justify-between gap-4">
            <div className="basis-3/4 flex-col justify-start items-start gap-8 inline-flex w-full">
              {userHasScopes(["creator"]) ? (
                <CollapsableSection
                  title="What I created"
                  items={TasksContext}
                  emptyContent={"You haven’t created any projects yet..."}
                  emptyButtonLabel="Create"
                  buttonLabel="Create new project"
                  imageSrc={createHand}
                  onActionButtonClick={openModal}
                  dropdownMenuActions={{
                    edit: editProject,
                    delete: deleteProject,
                    share: shareProject,
                  }}
                />
              ) : (
                <div className="p-4 rounded-lg">
                  Are you a creator?{" "}
                  <Link className="text-orange-500" to="/joinalpha">
                    Request Alpha Access
                  </Link>
                </div>
              )}

              {!user.policiesConsent && <Modal show={openTOSModal} onClose={() => setOpenTOSModal(false)}>
                <Modal.Header>Terms of Service</Modal.Header>
                <Modal.Body>
                  <div className="space-y-6">
                    <p>
                      <strong>Last Updated:</strong> August 11, 2024
                    </p>
                    <div>
                      <p>
                        <strong>1. Introduction</strong> Welcome to The PageDAO
                        App (the “Service”). By accessing or using our Service,
                        you agree to comply with and be bound by the following
                        terms and conditions (the “Terms”). Please review these
                        Terms carefully, and if you do not agree with them, you
                        should not use our Service.
                      </p>
                    </div>
                    <div>
                      <p>
                        <strong>2. Service Description</strong> Our Service
                        allows users to publish work to multiple blockchains and
                        create user profiles. Smart Wallets are provided for
                        users signing in without Web3 Wallets. Please note that
                        the Service is currently in a testing phase and may
                        contain bugs or unintended behavior.
                      </p>
                    </div>
                    <div>
                      <p>
                        <strong>Non Custodial Smart Wallets</strong>
                      </p>
                    </div>
                    <div>
                      <p>
                        Dynamic-powered embedded wallets are non-custodial,
                        meaning they are always end-user owned and controlled.
                        Only the end-user has ownership and access to their
                        wallet private keys.
                      </p>
                    </div>
                    <div>
                      <p>
                        Dynamic leverages a combination of internal and third
                        party services including trusted execution environments
                        (TEEs, specifically AWS Nitro Enclaves), secure key
                        management, advanced policy engines and iframes to limit
                        potential security threats and ensure end user
                        self-custody. All wallet private keys are encrypted and
                        isolated such that neither Dynamic nor the Developer
                        have access to the end user’s wallet private keys.
                        End-user decryption activities are all performed in
                        trusted execution environments and only run upon
                        end-user activity requests.
                      </p>
                    </div>
                    <div>
                      <p>
                        In addition, all end users of Dynamic-powered embedded
                        wallets can always export their wallet private key to
                        take their assets into a different wallet provider or
                        alternative storage location. Dynamic is also working to
                        add additional features to limit potential connections
                        between the end-user and Dynamic or Developer services.
                        As an example, these may include:
                      </p>
                    </div>
                    <div>
                      <ul>
                        <li>
                          <p>
                            Fallback back up support if Dynamic or your site is
                            ever down
                          </p>
                        </li>
                        <li>
                          <p>
                            Allowing users to disassociate their embedded wallet
                            data with the service.
                          </p>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <p>
                        Dynamic is SOC2 Type 2 compliant and hires an
                        independent third parties to regularly conduct audits of
                        our code, processes and systems. Dynamic also runs
                        evergreen bug bounty programs.
                      </p>
                    </div>
                    <div>
                      <p>
                        <strong>3. Risks and Disclaimer</strong> By using our
                        Service, you acknowledge and agree that:
                      </p>
                    </div>
                    <div>
                      <ul>
                        <li>
                          <p>
                            <strong>Data Loss:</strong> The Service may
                            experience data loss due to technical issues or
                            other factors. We do not guarantee the integrity or
                            retention of any data.
                          </p>
                        </li>
                        <li>
                          <p>
                            <strong>Financial Loss:</strong> The Service may
                            involve interactions with cryptocurrencies or other
                            financial assets. There is a risk of financial loss,
                            including but not limited to misrouted funds, failed
                            transactions, or changes in asset value. We are not
                            liable for any financial losses incurred.
                          </p>
                        </li>
                        <li>
                          <p>
                            <strong>Unauthorized Content Access:</strong> The
                            Service may have vulnerabilities that could result
                            in unauthorized access to your content or personal
                            information. We do not warrant the security of the
                            Service.
                          </p>
                        </li>
                        <li>
                          <p>
                            <strong>Interface Changes:</strong> The user
                            interface of the Service is subject to change
                            without notice, and such changes may alter the user
                            experience or functionality.
                          </p>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <p>
                        <strong>4. User Participation and Feedback</strong>{" "}
                        Users are encouraged to participate in requesting
                        features and providing feedback. However, any changes or
                        features implemented as a result of user requests may
                        break or modify existing functionality. We do not
                        guarantee the implementation of any requested features
                        or changes.
                      </p>
                    </div>
                    <div>
                      <p>
                        <strong>5. No Warranties</strong> The Service is
                        provided “as is” and “as available” without any
                        warranties, express or implied. We make no
                        representations or warranties regarding the accuracy,
                        reliability, or availability of the Service.
                      </p>
                    </div>
                    <div>
                      <p>
                        <strong>6. Limitation of Liability</strong> To the
                        fullest extent permitted by law, PageDAO and its
                        affiliates shall not be liable for any direct, indirect,
                        incidental, special, or consequential damages arising
                        out of or in connection with your use of the Service,
                        including but not limited to data loss, financial loss,
                        or unauthorized content access.
                      </p>
                    </div>
                    <div>
                      <p>
                        <strong>7. Indemnification</strong> You agree to
                        indemnify, defend, and hold harmless PageDAO, its
                        officers, directors, employees, and affiliates from any
                        claims, liabilities, damages, losses, or expenses
                        (including legal fees) arising out of or in connection
                        with your use of the Service.
                      </p>
                    </div>
                    <div>
                      <p>
                        <strong>8. Termination</strong> We reserve the right to
                        terminate or suspend your access to the Service at our
                        discretion, without notice, for conduct that we believe
                        violates these Terms or is harmful to other users of the
                        Service or to PageDAO.
                      </p>
                    </div>
                    <div>
                      <p>
                        <strong>9. Changes to the Terms</strong> We may update
                        these Terms from time to time. Any changes will be
                        effective immediately upon posting the revised Terms.
                        Your continued use of the Service after the posting of
                        changes constitutes your acceptance of such changes.
                      </p>
                    </div>
                    <div>
                      <p>
                        <strong>10. Governing Law</strong> These Terms are
                        governed by and construed in accordance with the laws of
                        [Jurisdiction], without regard to its conflict of law
                        principles.
                      </p>
                    </div>
                    <div>
                      <p>
                        <strong>11. Contact Information</strong> If you have any
                        questions or concerns about these Terms, please contact
                        us at{" "}
                        <a href="mailto:info@pagedao.org">info@pagedao.org</a>.
                      </p>
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={() => {
                    //todo: do a dynamic userupdate request and set the user's policiesConsent to true
                    updateUser({ policiesConsent: true });
                    setOpenTOSModal(false)
                    }}>
                    I accept
                  </Button>
                  <Button color="gray" onClick={() => setOpenTOSModal(false)}>
                    Decline
                  </Button>
                </Modal.Footer>
              </Modal>
}
              <ProjectModal
                modalIsOpen={modalIsOpen}
                setIsOpen={setIsOpen}
                type="added"
                itemID={nextItemId}
              />
              <Toast.Root
                className="ToastRoot"
                open={open}
                onOpenChange={setOpen}
              >
                <Toast.Title className="ToastTitle">{toastMessage}</Toast.Title>
                <Toast.Description asChild></Toast.Description>
                <Toast.Action className="ToastAction" asChild altText="undo">
                  <button className="Button small green">Undo</button>
                </Toast.Action>
              </Toast.Root>
              <Toast.Viewport className="ToastViewport" />
            </div>
            {tasks && (
              <div className="basis-1/4 w-full">
                <SideBar projects={tasks.length} />
              </div>
            )}
          </div>
        </div>
      </Toast.Provider>
    </>
  );
}

export default Content;
