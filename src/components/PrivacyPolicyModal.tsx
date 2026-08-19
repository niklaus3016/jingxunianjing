import React from 'react';
import { AgreementModal } from './AgreementModal';
import { PrivacyPolicyContent } from './PrivacyPolicyContent';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * 设置页打开的隐私政策弹窗
 * 复用 AgreementModal 外壳与 PrivacyPolicyContent 正文，
 * 与启动同意流程展示的内容保持一致。
 */
export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <AgreementModal onClose={onClose} title="隐私政策">
      <PrivacyPolicyContent />
    </AgreementModal>
  );
};
