<?php
namespace half\picnic;

use yii\web\AssetBundle;

class PicnicAsset extends AssetBundle
{
    public $sourcePath = '@vendor/half/yii2-picnic/dist';

    public $js = [
        'picnic.js',
    ];

    public $depends = [
        'yii\web\JqueryAsset'
    ];
}