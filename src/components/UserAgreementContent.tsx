import React from 'react';

/**
 * 《用户服务协议》正文
 * 按「静序念经」实际功能撰写服务内容章节；其余通用条款保留。
 * 公司名与邮箱按用户指定保留参考代码原值；生效日期为今日。
 */
export const UserAgreementContent: React.FC = () => {
  return (
    <div className="text-white/70 text-[13px] leading-relaxed">
      <h1 className="text-xl font-bold text-amber-300 text-center mb-2">
        用户服务协议
      </h1>
      <p className="text-center text-white/40 mb-8">
        更新日期：2026年8月19日
      </p>

      <h2 className="text-base font-semibold text-amber-100 mt-6 mb-3">
        1. 协议的接受
      </h2>
      <p className="mb-3">欢迎使用「静序念经」应用（以下简称「本应用」）。</p>
      <p className="mb-3">
        本协议是您与
        <strong className="text-amber-300"> 光年跃迁（温州）科技有限公司 </strong>
        （以下简称「我们」）之间关于使用本应用的法律协议。
      </p>
      <p className="mb-3">
        通过下载、安装或使用本应用，您表示同意接受本协议的全部条款和条件。如您不同意本协议的任何条款，请勿安装或使用本应用，并应立即删除或卸载。
      </p>

      <h2 className="text-base font-semibold text-amber-100 mt-6 mb-3">
        2. 服务内容
      </h2>
      <p className="mb-3">本应用为您提供以下轻量化治愈系电子木鱼工具服务：</p>
      <ul className="list-disc pl-5 mb-3 space-y-1.5">
        <li>木鱼敲击交互，含单击、双击、长按连击等触感反馈；</li>
        <li>功德计数与历史峰值记录、今日敲击统计；</li>
        <li>多款木鱼皮肤与多种敲击音色切换；</li>
        <li>自动敲击模式（可调速度与独立震动开关）；</li>
        <li>禅修倒计时（含梵钟收尾）；</li>
        <li>自定义祈福文案、颜色与浮动动画参数；</li>
        <li>功德统计、修持成就与祈福海报生成；</li>
        <li>其他可能在后续版本中提供的功能。</li>
      </ul>
      <p className="mb-3">
        本应用所有功能均在您的设备本地运行，<strong className="text-amber-100">无需注册登录、无需联网</strong>
        ，您的使用数据不会上传至任何服务器。
      </p>

      <h2 className="text-base font-semibold text-amber-100 mt-6 mb-3">
        3. 用户义务
      </h2>
      <p className="mb-3">作为本应用的用户，您同意：</p>
      <ul className="list-disc pl-5 mb-3 space-y-1.5">
        <li>遵守本协议的所有条款；</li>
        <li>不使用本应用进行任何违反中华人民共和国法律法规的活动；</li>
        <li>不通过任何手段干扰本应用的正常运行，或尝试逆向工程、反编译、反汇编本应用；</li>
        <li>妥善保管您的设备，防止他人未授权访问您的本地应用数据。</li>
      </ul>

      <h2 className="text-base font-semibold text-amber-100 mt-6 mb-3">
        4. 知识产权
      </h2>
      <p className="mb-3">
        本应用的所有内容，包括但不限于文字、图像、音频、音效合成算法、软件代码、界面设计、图标等，均受知识产权法律保护，其著作权及相关权利归我们所有。
      </p>
      <p className="mb-3">
        未经我们书面许可，您不得复制、修改、分发、传播、出租、出借或以其他方式将本应用的任何部分用于商业用途，亦不得对本应用进行二次开发或派生其他作品。
      </p>

      <h2 className="text-base font-semibold text-amber-100 mt-6 mb-3">
        5. 免责声明
      </h2>
      <p className="mb-3">
        本应用按「原样」提供，我们不就本应用作出任何形式的明示或默示保证。
      </p>
      <p className="mb-3">我们不保证：</p>
      <ul className="list-disc pl-5 mb-3 space-y-1.5">
        <li>本应用将完全符合您的所有使用需求；</li>
        <li>本应用将无中断、及时、安全或完全无错误地运行；</li>
        <li>本应用在所有设备与系统环境上均能正常使用；</li>
        <li>本应用所提供的功德计数等数据对您具有任何宗教、心理或现实承诺效力。</li>
      </ul>
      <p className="mb-3">
        在任何情况下，我们均不对因使用或无法使用本应用而造成的任何直接、间接、附带或后果性损失承担责任。
      </p>

      <h2 className="text-base font-semibold text-amber-100 mt-6 mb-3">
        6. 协议终止
      </h2>
      <p className="mb-3">
        您可随时停止使用本应用，并通过卸载应用的方式终止本协议。卸载后，您设备本地的所有应用数据将被自动清除。
      </p>
      <p className="mb-3">
        如您违反本协议的任何条款，我们保留随时限制或终止您使用本应用的权利。
      </p>

      <h2 className="text-base font-semibold text-amber-100 mt-6 mb-3">
        7. 适用法律与争议解决
      </h2>
      <p className="mb-3">本协议受中华人民共和国法律管辖并据其解释。</p>
      <p className="mb-3">
        任何因本协议或本应用产生的争议，双方应首先通过友好协商解决；协商不成的，任何一方均有权向
        <strong className="text-amber-300">温州市</strong>
        有管辖权的人民法院提起诉讼。
      </p>

      <h2 className="text-base font-semibold text-amber-100 mt-6 mb-3">
        8. 联系我们
      </h2>
      <p className="mb-3">
        如您对本协议有任何疑问或建议，可通过以下方式与我们联系：
      </p>
      <div className="bg-white/5 p-4 rounded-xl border border-white/5 mb-6">
        <p className="text-amber-100/90">
          <strong className="text-amber-300">电子邮箱</strong>：Jp112022@163.com
        </p>
      </div>

      <div className="mt-8 pt-6 border-t border-white/5 text-center">
        <p className="mb-2 text-white/40">感谢您使用静序念经。</p>
        <p className="text-[11px] text-white/30">
          © 2026 光年跃迁（温州）科技有限公司 版权所有
        </p>
      </div>
    </div>
  );
};
