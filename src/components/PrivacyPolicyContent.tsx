import React from 'react';

/**
 * 《隐私政策》正文
 * 按「静序念经」实际能力如实撰写：
 *   - 完全本地、无网络、无后端、无第三方 SDK、无广告、无追踪
 *   - 仅 localStorage 存储功德计数、皮肤/音效、自定义文案
 *   - 仅在用户开启时调用 navigator.vibrate 与 Web Audio API
 * 公司名与邮箱按用户指定保留参考代码原值；生效日期为今日。
 */
export const PrivacyPolicyContent: React.FC = () => {
  return (
    <div className="text-white/70 text-[13px] leading-relaxed">
      <h1 className="text-xl font-bold text-amber-300 text-center mb-2">
        隐私政策
      </h1>
      <p className="text-center text-white/40 mb-6">
        <strong className="text-white/60">生效日期</strong>：2026年8月19日
      </p>

      <div className="bg-amber-500/5 p-4 rounded-2xl border-l-2 border-amber-500/40 mb-6">
        <p className="text-amber-100/90">
          欢迎使用「静序念经」（以下简称“本应用”）。本应用由
          <strong className="text-amber-300"> 光年跃迁（温州）科技有限公司 </strong>
          （以下简称“我们”）开发并运营。我们深知个人信息对您的重要性，将严格遵守《中华人民共和国个人信息保护法》等相关法律法规，保护您的个人信息安全。
        </p>
      </div>

      <p className="mb-6">
        本隐私政策旨在说明我们如何收集、使用、存储和保护您在使用本应用过程中产生的信息，以及您对这些信息所享有的权利。请您在使用本应用前仔细阅读并充分理解本政策的全部内容，尤其是加粗的条款。如您对本政策有任何疑问、意见或建议，可通过本政策末尾提供的联系方式与我们联系。
      </p>

      <h2 className="text-base font-semibold text-amber-100 mt-6 mb-3 border-b border-white/5 pb-1.5">
        一、我们收集的信息
      </h2>
      <p className="mb-3">在您使用本应用的过程中，我们会处理以下信息，以提供、维护和改进我们的服务：</p>
      <ol className="list-decimal pl-5 mb-6 space-y-2.5">
        <li>
          <strong className="text-amber-100">本地应用数据</strong>
          ：您在使用本应用过程中产生的<strong className="text-amber-100">功德计数、皮肤与音效选择、自定义祈福文案、敲击与禅修设置</strong>等数据。这些数据仅保存在您设备的本地存储（LocalStorage）中，用于实现本应用的核心功能，不会上传至任何服务器。
        </li>
        <li>
          <strong className="text-amber-100">硬件调用</strong>
          ：仅在您主动开启「物理震动」时，调用设备的触觉震动反馈（navigator.vibrate）；在您敲击木鱼或选择音效时，调用 Web Audio API 合成并播放木鱼音效。本应用<strong className="text-amber-100">不会获取</strong>您的摄像头、麦克风、地理位置、通讯录、相册或设备唯一标识符（如 IMEI / Android ID）等隐私权限。
        </li>
      </ol>

      <h2 className="text-base font-semibold text-amber-100 mt-6 mb-3 border-b border-white/5 pb-1.5">
        二、我们如何使用收集的信息
      </h2>
      <p className="mb-3">我们仅会在以下合法、正当、必要的范围内使用您的相关信息：</p>
      <ol className="list-decimal pl-5 mb-6 space-y-2.5">
        <li>
          <strong className="text-amber-100">提供核心功能</strong>
          ：使用本地应用数据实现功德计数、皮肤切换、音效播放、自定义祈福文案、自动敲击、禅修倒计时等功能。
        </li>
        <li>
          <strong className="text-amber-100">提升使用体验</strong>
          ：在您重新打开应用时，自动恢复您上次设置的皮肤、音效、文案与偏好，避免重复配置。
        </li>
        <li>
          <strong className="text-amber-100">不进行任何分析或上报</strong>
          ：本应用完全离线运行，不会对您的数据进行匿名化、去标识化处理，也不会进行任何统计分析或上报。
        </li>
      </ol>

      <h2 className="text-base font-semibold text-amber-100 mt-6 mb-3 border-b border-white/5 pb-1.5">
        三、我们如何共享、转让和公开披露信息
      </h2>
      <p className="mb-3">
        我们郑重承诺：<strong className="text-amber-100">本应用完全离线，无网络通信能力</strong>
        ，不会向任何第三方共享、转让或公开披露您的个人信息。除以下法定情形外，我们不会以任何形式对外提供您的数据：
      </p>
      <ol className="list-decimal pl-5 mb-6 space-y-2.5">
        <li>
          <strong className="text-amber-100">法定情形</strong>
          ：根据法律法规的规定、行政或司法机关的强制性要求，我们可能会向有关部门披露您的相关信息。
        </li>
      </ol>

      <h2 className="text-base font-semibold text-amber-100 mt-6 mb-3 border-b border-white/5 pb-1.5">
        四、我们如何存储和保护信息
      </h2>
      <ol className="list-decimal pl-5 mb-6 space-y-2.5">
        <li>
          <strong className="text-amber-100">存储地点</strong>
          ：您的所有应用数据<strong className="text-amber-100">仅存储在您本人设备的浏览器或应用的本地存储（LocalStorage）中</strong>
          ，不会上传至云端或任何外部服务器，不存在跨境传输情形。
        </li>
        <li>
          <strong className="text-amber-100">存储期限</strong>
          ：您的数据将一直保留在您的设备本地，直至您主动清除应用数据、卸载应用或通过应用内的功能重置相应数据。
        </li>
        <li>
          <strong className="text-amber-100">安全措施</strong>
          ：由于数据完全存储在您的本地设备，其安全性取决于您设备本身的安全状况。建议您妥善保管设备，避免设备被他人未授权访问。
        </li>
      </ol>

      <h2 className="text-base font-semibold text-amber-100 mt-6 mb-3 border-b border-white/5 pb-1.5">
        五、您的权利
      </h2>
      <p className="mb-3">根据相关法律法规，您对您的个人信息享有以下权利：</p>
      <ol className="list-decimal pl-5 mb-6 space-y-2.5">
        <li>
          <strong className="text-amber-100">访问权</strong>
          ：您可以随时在本应用中查看您的功德计数、设置项与自定义文案。
        </li>
        <li>
          <strong className="text-amber-100">更正权</strong>
          ：您可以随时在应用设置中修改皮肤、音效、震动、文案等各项配置。
        </li>
        <li>
          <strong className="text-amber-100">删除权</strong>
          ：您可以通过应用内「功德统计」页的「手动清零」功能重置功德计数；亦可卸载应用或在系统设置中清除应用数据，以彻底删除所有本地数据。
        </li>
        <li>
          <strong className="text-amber-100">数据导出</strong>
          ：由于数据均存储在您的设备本地，您可以通过系统级备份等方式自行导出。
        </li>
      </ol>

      <h2 className="text-base font-semibold text-amber-100 mt-6 mb-3 border-b border-white/5 pb-1.5">
        六、未成年人保护
      </h2>
      <p className="mb-6">
        我们非常重视对未成年人个人信息的保护。如您是未满 14 周岁的未成年人，在使用本应用前，应在监护人的指导下仔细阅读本政策，并征得监护人的同意。如我们发现自己在未事先获得监护人可验证同意的情况下收集了未成年人的个人信息，将立即删除相关数据。
      </p>

      <h2 className="text-base font-semibold text-amber-100 mt-6 mb-3 border-b border-white/5 pb-1.5">
        七、本政策的更新
      </h2>
      <p className="mb-6">
        我们可能会根据法律法规的更新、业务的调整或技术的发展，适时对本隐私政策进行修订。修订后的政策将在本应用内显著位置公示，并在生效前通过合理方式通知您。如您继续使用本应用，即表示您同意接受修订后的政策。
      </p>

      <h2 className="text-base font-semibold text-amber-100 mt-6 mb-3 border-b border-white/5 pb-1.5">
        八、联系我们
      </h2>
      <p className="mb-4">
        如您对本隐私政策有任何疑问、意见或建议，或需要行使您的相关权利，请通过以下方式与我们联系：
      </p>
      <div className="bg-white/5 p-4 rounded-xl border border-white/5 mb-6">
        <p className="text-amber-100/90">
          <strong className="text-amber-300">电子邮箱</strong>：Jp112022@163.com
        </p>
      </div>

      <div className="mt-8 pt-6 border-t border-white/5 text-center">
        <p className="mb-2 text-white/40">感谢您使用静序念经！</p>
        <p className="mb-4 text-white/40">我们致力于为您提供纯净、清静的禅修解压环境。</p>
        <p className="text-[11px] text-white/30">
          © 2026 光年跃迁（温州）科技有限公司 版权所有
        </p>
      </div>
    </div>
  );
};
