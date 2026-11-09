/** The unfolded carton drawing used as the brand's background motif. */
export default function Dieline({ className = '' }) {
  return (
    <svg viewBox="0 0 640 520" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true" className={className}>
      <path d="M160 130h320v260H160z" />
      <path d="M160 130l26-92h268l26 92M160 390l26 92h268l26-92" />
      <path d="M160 130L58 156v208l102 26M480 130l102 26v208l-102 26" />
      <path d="M58 156l-30 14v180l30 14M582 156l30 14v180l-30 14" />
      <path d="M186 38l14-26h240l14 26M186 482l14 26h240l14-26" />
      <path strokeDasharray="5 6" d="M160 130h320M160 390h320M160 130v260M480 130v260M186 38h268M186 482h268M58 156v208M582 156v208" />
      <path d="M320 240v40M300 260h40" />
      <circle cx="320" cy="260" r="12" />
    </svg>
  );
}
