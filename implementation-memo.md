# 実装メモ

## Rotation Constraintの回転順序

ムズい

### Sourceの回転差分の決定

- SourceがLocal Spaceの場合
  - 初期状態のLocal Transformを親と見立てて、そこからのローカルでどう回転したかを差分とする
- SourceがModel Spaceの場合
  - シンプルにModel Spaceで観測し、初期状態からどう回転したかを差分とする

### Destinationへの回転の適用の決定

- DestinationがLocal Spaceの場合
  - 初期状態のLocal Transformを親と見立てて、そこから子を回すように回転差分を適用する
- DestinationがModel Spaceの場合
  - 初期状態にTransformを戻した上で、シンプルにModel Spaceに回転差分を適用する
  - つまり、いったんモデルスペースのInverse Matrixの回転を当ててから・回転を適用して・戻す、必要がある
