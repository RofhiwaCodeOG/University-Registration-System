"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { CreditCard, Building2, Smartphone, Shield } from "lucide-react"

interface StepFourProps {
  formData: {
    paymentMethod: string
    selectedCourses: string[]
  }
  updateFormData: (data: Partial<StepFourProps["formData"]>) => void
}

export function StepFour({ formData, updateFormData }: StepFourProps) {
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")

  const totalCredits = formData.selectedCourses.length * 15
  const totalAmount = totalCredits * 850 + 1500 + 850

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Complete Payment</h2>
        <p className="text-foreground-muted leading-relaxed">
          Choose your payment method and complete your registration. Your information is secure and encrypted.
        </p>
      </div>

      {/* Security Notice */}
      <div className="bg-info-bg border border-info/20 rounded-lg p-4 flex items-start gap-3">
        <Shield className="w-5 h-5 text-info flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-foreground mb-1">Secure Payment</p>
          <p className="text-sm text-foreground-muted">
            All transactions are encrypted and processed securely. Your payment information is never stored on our
            servers.
          </p>
        </div>
      </div>

      {/* Amount Summary */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-foreground">Total Amount</span>
          <span className="text-2xl font-bold text-primary">R {totalAmount.toLocaleString()}</span>
        </div>
      </div>

      {/* Payment Method Selection */}
      <div className="space-y-4">
        <Label className="text-base font-semibold">Select Payment Method</Label>
        <RadioGroup
          value={formData.paymentMethod}
          onValueChange={(value) => updateFormData({ paymentMethod: value })}
          className="space-y-3"
        >
          <div
            className={`border rounded-lg p-4 cursor-pointer transition-all ${
              formData.paymentMethod === "card"
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50"
            }`}
          >
            <div className="flex items-center gap-3">
              <RadioGroupItem value="card" id="card" />
              <Label htmlFor="card" className="flex items-center gap-3 cursor-pointer flex-1">
                <CreditCard className="w-5 h-5 text-foreground-muted" />
                <div>
                  <p className="font-medium text-foreground">Credit/Debit Card</p>
                  <p className="text-sm text-foreground-muted">Visa, Mastercard, American Express</p>
                </div>
              </Label>
            </div>
          </div>

          <div
            className={`border rounded-lg p-4 cursor-pointer transition-all ${
              formData.paymentMethod === "eft" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
            }`}
          >
            <div className="flex items-center gap-3">
              <RadioGroupItem value="eft" id="eft" />
              <Label htmlFor="eft" className="flex items-center gap-3 cursor-pointer flex-1">
                <Building2 className="w-5 h-5 text-foreground-muted" />
                <div>
                  <p className="font-medium text-foreground">EFT/Bank Transfer</p>
                  <p className="text-sm text-foreground-muted">Direct bank transfer</p>
                </div>
              </Label>
            </div>
          </div>

          <div
            className={`border rounded-lg p-4 cursor-pointer transition-all ${
              formData.paymentMethod === "mobile"
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50"
            }`}
          >
            <div className="flex items-center gap-3">
              <RadioGroupItem value="mobile" id="mobile" />
              <Label htmlFor="mobile" className="flex items-center gap-3 cursor-pointer flex-1">
                <Smartphone className="w-5 h-5 text-foreground-muted" />
                <div>
                  <p className="font-medium text-foreground">Mobile Payment</p>
                  <p className="text-sm text-foreground-muted">SnapScan, Zapper, or other mobile wallets</p>
                </div>
              </Label>
            </div>
          </div>
        </RadioGroup>
      </div>

      {/* Card Payment Form */}
      {formData.paymentMethod === "card" && (
        <div className="space-y-4 pt-4 border-t border-border">
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input
              id="cardNumber"
              type="text"
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              maxLength={19}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input
                id="expiryDate"
                type="text"
                placeholder="MM/YY"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                maxLength={5}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                type="text"
                placeholder="123"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                maxLength={4}
              />
            </div>
          </div>
        </div>
      )}

      {/* Terms and Conditions */}
      <div className="bg-surface border border-border rounded-lg p-4">
        <p className="text-sm text-foreground-muted leading-relaxed">
          By completing this payment, you agree to the{" "}
          <a href="#" className="text-primary hover:underline">
            VUT Registration Terms and Conditions
          </a>{" "}
          and confirm that all information provided is accurate.
        </p>
      </div>
    </div>
  )
}
