import { useEffect } from 'react'
import { useParams } from '@redwoodjs/router'
import { Metadata, useQuery } from '@redwoodjs/web'
import { gql } from '@redwoodjs/web'
import Navigation from 'src/components/Navigation/Navigation'
import Footer from 'src/components/Footer/Footer'

const VERIFY_RECEIPT = gql`
  query VerifyClientReceiptQuery($code: String!) {
    verifyClientReceipt(code: $code) {
      valid
      clientName
      projectName
      paidAmount
      paidAt
      receiptCode
      paymentStatus
      message
    }
  }
`

const euro = (n) =>
  `€${Number(n || 0).toLocaleString('en-IE', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`

const VerifyReceiptPage = () => {
  const { code } = useParams()
  const { data, loading, error } = useQuery(VERIFY_RECEIPT, {
    variables: { code: String(code || '').toUpperCase() },
    skip: !code,
    fetchPolicy: 'network-only',
  })

  const result = data?.verifyClientReceipt

  useEffect(() => {
    document.title = result?.valid
      ? 'Receipt verified — FRVG'
      : 'Verify receipt — FRVG'
  }, [result?.valid])

  return (
    <>
      <Metadata title="Verify receipt - Filip Rusiecki Video Games" />
      <div className="dark bg-game-dark min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-lg mx-auto border border-game-accent/30 rounded-lg p-8 text-center bg-game-dark/80">
            <p className="text-game-accent text-xs font-semibold tracking-[0.2em] uppercase mb-4">
              Filip Rusiecki Video Games
            </p>
            <h1 className="text-2xl font-bold text-game-light mb-2">Receipt verification</h1>
            <p className="text-game-light/50 text-sm mb-8">
              Official paid-in-full records are checked against our books — a edited PDF is not
              proof of payment.
            </p>

            {!code && (
              <p className="text-red-400 text-sm">No receipt code in this link.</p>
            )}
            {loading && <p className="text-game-light/60 text-sm">Checking…</p>}
            {error && (
              <p className="text-red-400 text-sm">Could not verify right now. Try again later.</p>
            )}
            {result && !loading && (
              <div
                className={`rounded-lg border p-6 ${
                  result.valid
                    ? 'border-green-500/50 bg-green-500/10'
                    : 'border-red-500/40 bg-red-500/10'
                }`}
              >
                <p
                  className={`text-lg font-bold mb-3 ${
                    result.valid ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {result.valid ? 'PAID IN FULL — VERIFIED' : 'NOT VERIFIED'}
                </p>
                <p className="text-game-light/70 text-sm mb-4">{result.message}</p>
                {result.valid && (
                  <dl className="text-left text-sm space-y-2 text-game-light/80">
                    <div className="flex justify-between gap-4">
                      <dt className="text-game-light/45">Client</dt>
                      <dd className="font-semibold">{result.clientName}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-game-light/45">Project</dt>
                      <dd className="font-semibold">{result.projectName}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-game-light/45">Amount</dt>
                      <dd className="font-semibold text-game-accent">
                        {euro(result.paidAmount)}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-game-light/45">Paid on</dt>
                      <dd className="font-semibold">
                        {result.paidAt
                          ? new Date(result.paidAt).toLocaleDateString('en-IE', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })
                          : '—'}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-game-light/45">Code</dt>
                      <dd className="font-mono text-xs">{result.receiptCode}</dd>
                    </div>
                  </dl>
                )}
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default VerifyReceiptPage
