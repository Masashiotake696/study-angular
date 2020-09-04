// MinimalLoggerは抽象クラスであるため他のクラスで継承できるが、そのように使っておらず、このMinimalLoggerクラスはDIトークンとしてのみ使用される
// このようにクラスを使用する場合、クラスはクラスインターフェースと呼ばれる
export abstract class MinimalLogger {
  logs: string[];
  logInfo: (message: string) => void;
}
